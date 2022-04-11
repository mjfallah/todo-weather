import React, { useState, useContext, useRef, useEffect } from "react";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

// Styles
import "../ToDoModal/ToDoModal.css";

// Functions
import { today, scrollHandler, validationHandler } from "../../../Functions";

const EditModal = ({
  editDisplayHandler,
  editTitle,
  editDescription,
  editDate,
  editLabel,
  editPriority,
  setSearchInputValue,
  filteredTasksWithLabelOrPriorityHandler,
  type,
}) => {
  const { toDos, dispatch } = useContext(ToDoContext);

  const [isValid, setIsValid] = useState(true);

  const [newData, setNewData] = useState({
    title: editTitle,
    description: editDescription,
    date: editDate,
    label: editLabel,
    priority: editPriority,
  });

  const previousData = {
    title: editTitle,
    description: editDescription,
    date: editDate,
    label: editLabel,
    priority: editPriority,
  };
  
  const editToDO = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch({ type, payLoad: newData, oldData: previousData });
      editDisplayHandler();
      setSearchInputValue && setSearchInputValue("");
      filteredTasksWithLabelOrPriorityHandler &&
        filteredTasksWithLabelOrPriorityHandler();
    }
  };

  const titleInput = useRef(null);

  const inputHandler = (event) => {
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    titleInput.current.focus();
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="modal" onClick={editDisplayHandler}>
      <div
        className="modalContent"
        onClick={(event) => event.stopPropagation()}
      >
        <form id="toDoModal" onSubmit={editToDO} className="modalForm">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={newData.title}
            onChange={inputHandler}
            onKeyUp={(event) => validationHandler(event, setIsValid)}
            ref={titleInput}
          />
          <textarea
            name="description"
            placeholder="description..."
            value={newData.description}
            onChange={inputHandler}
          />
          <div className="date-label-priority">
            <input
              type="date"
              name="date"
              value={newData.date}
              onChange={inputHandler}
              min={today}
            />
            <div>
              <select
                name="label"
                onChange={inputHandler}
                value={newData.label}
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
                value={newData.priority}
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
                Edit Task
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={editDisplayHandler}
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

export default EditModal;
