import React, { useState, useContext, useRef, useEffect } from "react";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

// Styles
import "./ToDoModal.css";

// Functions
import { today, scrollHandler, validationHandler } from "../../../Functions";

const ToDoModal = ({ addModalDisplayHandler }) => {
  const { toDos, dispatch } = useContext(ToDoContext);

  const [isValid, setIsValid] = useState(false);

  const [toDoData, setToDoData] = useState({
    title: "",
    description: "",
    date: today,
    label: "",
    priority: "",
  });
  
  const addToDo = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch({ type: "ADD_TODO", payLoad: toDoData });
      setToDoData({
        title: "",
        description: "",
        date: "",
        label: "",
        priority: "",
      });
      addModalDisplayHandler();
    }
  };

  const cancelToDo = () => {
    setToDoData({
      title: "",
      description: "",
      date: "",
      label: "",
      priority: "",
    });
    addModalDisplayHandler();
  };
  
  const titleInput = useRef(null);
  
  const inputHandler = (event) => {
    setToDoData({ ...toDoData, [event.target.name]: event.target.value });
  };
  
  useEffect(() => {
    titleInput.current.focus();
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="modal" onClick={addModalDisplayHandler}>
      <div
        className="modalContent"
        onClick={(event) => event.stopPropagation()}
      >
        <form id="toDoModal" onSubmit={addToDo} className="modalForm">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={toDoData.title}
            onChange={inputHandler}
            onKeyUp={(event) => validationHandler( event, setIsValid)}
            ref={titleInput}
          />
          <textarea
            name="description"
            placeholder="description..."
            value={toDoData.description}
            onChange={inputHandler}
          />
          <div className="date-label-priority">
            <input
              type="date"
              name="date"
              value={toDoData.date}
              onChange={inputHandler}
              min={today}
            />
            <div>
              <select
                name="label"
                onChange={inputHandler}
                value={toDoData.label}
                className="labels"
              >
                <option value="" disabled hidden>
                  Labels
                </option>
                {toDos.labels.length &&
                  toDos.labels.map((label) => (
                    <option key={Math.random()} value={label.name}>
                      {label.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <select
                name="priority"
                value={toDoData.priority}
                onChange={inputHandler}
                className="labels"
              >
                <option value="" disabled hidden>
                  Priorities
                </option>
                <option value="Priority 1">Priority 1</option>
                <option value="Priority 2">Priority 2</option>
                <option value="Priority 3">Priority 3</option>
                <option value="Priority 4">Priority 4</option>
                <option value="Priority 5">Priority 5</option>
              </select>
            </div>
          </div>
          <div className="buttons-container">
            <div className="buttons">
              <button
                type="submit"
                className={`add-button ${isValid ? "" : "invalid-task"}`}
              >
                Add Task
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={cancelToDo}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToDoModal;
