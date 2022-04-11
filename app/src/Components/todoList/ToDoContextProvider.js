import React, { createContext, useEffect, useReducer } from "react";

import { today } from "../../Functions";

const initialState = {
  primaryLoading: true,
  overDue: [],
  scheduled: [],
  checked: [],
  labels: [],
};

export const ToDoContext = createContext();

const toDoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      state.scheduled.push({ ...action.payLoad });
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        scheduled: [...state.scheduled],
      };
    case "ADD_PREV":
      const arrayOfNewOverDues = action.payLoad.scheduled.filter(
        (item) => item.date < today
      );
      const arrayOfOldOverDues = action.payLoad.overDue;
      const arrayOfScheduled = action.payLoad.scheduled.filter(
        (item) => item.date >= today
      );
      if (arrayOfNewOverDues) {
        state.overDue.push(...arrayOfNewOverDues);
      }
      if (arrayOfOldOverDues) {
        state.overDue.push(...arrayOfOldOverDues);
      }
      state.scheduled.push(...arrayOfScheduled);
      state.checked.push(...action.payLoad.checked);
      state.labels.push(...action.payLoad.labels)
      return {
        ...state,
        primaryLoading: false,
        scheduled: [...state.scheduled],
        overDue: [...state.overDue],
        checked: [...state.checked],
      };
    case "Checked":
      const checkedOverDueItem = state.overDue.find(
        (item) => item.title === action.itemTitle
      );
      const newOverDueArray = state.overDue.filter(
        (item) => item.title !== action.itemTitle
      );
      const checkedScheduledItem = state.scheduled.find(
        (item) => item.title === action.itemTitle
      );
      const newScheduledArray = state.scheduled.filter(
        (item) => item.title !== action.itemTitle
      );
      if (checkedOverDueItem) {
        state.checked.push(...[checkedOverDueItem]);
        state.overDue.splice(0);
        state.overDue.push(...newOverDueArray);
      }
      if (checkedScheduledItem) {
        state.checked.push(...[checkedScheduledItem]);
        state.scheduled.splice(0);
        state.scheduled.push(...newScheduledArray);
      }
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        scheduled: [...newScheduledArray],
        overDue: [...newOverDueArray],
        checked: [...state.checked],
      };
    case "Delete":
      const afterDeleteArray = state[action.itemCategory].filter(
        (item) => item.title !== action.itemTitle
      );
      state[action.itemCategory].splice(0);
      state[action.itemCategory].push(...afterDeleteArray);
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        [action.itemCategory]: [...afterDeleteArray],
      };
    case "EDIT_TODO":
      const taskIndex = state.scheduled.findIndex(
        (item) => item.title === action.oldData.title
      );
      state.scheduled[taskIndex] = {
        title: action.payLoad.title,
        description: action.payLoad.description,
        date: action.payLoad.date,
        label: action.payLoad.label,
        priority: action.payLoad.priority,
      };
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        scheduled: [...state.scheduled],
        overDue: [...state.overDue],
        checked: [...state.checked],
      };
    case "RE_SCHEDULE":
      const overDueTaskIndex = state.overDue.findIndex(
        (item) => item.title === action.oldData.title
      );
      state.overDue[overDueTaskIndex] = {
        title: action.payLoad.title,
        description: action.payLoad.description,
        date: action.payLoad.date,
        label: action.payLoad.label,
        priority: action.payLoad.priority,
      };
      state.scheduled.push(...state.overDue.splice([overDueTaskIndex], 1));
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        scheduled: [...state.scheduled],
        overDue: [...state.overDue],
        checked: [...state.checked],
      };
    case "EDIT_COMPLETED":
      const compeletedTaskIndex = state.checked.findIndex(
        (item) => item.title === action.oldData.title
      );
      state.checked[compeletedTaskIndex] = {
        title: action.payLoad.title,
        description: action.payLoad.description,
        date: action.payLoad.date,
        label: action.payLoad.label,
        priority: action.payLoad.priority,
      };
      state.scheduled.push(...state.checked.splice([compeletedTaskIndex], 1));
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        scheduled: [...state.scheduled],
        overDue: [...state.overDue],
        checked: [...state.checked],
      };
    case "ADD_LABEL":
      state.labels.push(action.payLoad);
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        labels: [...state.labels],
      };
    case "DELETE_LABEL":
      const newLabels = state.labels.filter(label => label.name !== action.payLoad);
      state.labels.splice(0);
      state.labels.push(...newLabels);
      window.localStorage.setItem("toDoItems", JSON.stringify(state));
      return {
        ...state,
        labels: [...state.labels],
      };
    default:
      return state;
  }
};

const ToDoContextProvider = ({ children }) => {
  const [toDos, dispatch] = useReducer(toDoReducer, initialState);

  useEffect(() => {
    const arrayOfToDos = JSON.parse(window.localStorage.getItem("toDoItems"));
    if (arrayOfToDos && toDos.primaryLoading) {
      dispatch({ type: "ADD_PREV", payLoad: arrayOfToDos });
    }
  }, []);

  return (
    <ToDoContext.Provider value={{ toDos, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoContextProvider;
