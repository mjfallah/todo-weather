import React, { useState, useContext, useRef, useEffect } from "react";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

// Styles
import labelsStyles from "./Labels.module.css";

// Functions
import { scrollHandler, validationHandler } from "../../../Functions";

const AddLabelModal = ({ displayHandler }) => {
  const { dispatch } = useContext(ToDoContext);

  const [isValid, setIsValid] = useState(false);

  const [labelData, setLabelData] = useState({
    name: "",
    color: "#000000",
  });

  const inputHandler = (event) => {
    setLabelData({ ...labelData, [event.target.name]: event.target.value });
  };

  const addLabel = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch({ type: "ADD_LABEL", payLoad: labelData });
      setLabelData({
        name: "",
        color: "#000000",
      });
      displayHandler();
    }
  };

  const cancelLabel = () => {
    setLabelData({
      name: "",
      color: "#000000",
    });
    displayHandler();
  };

  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <div className="modal" onClick={displayHandler}>
      <div
        className="modalContent"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={addLabel}>
          <div className={labelsStyles.inputContainer}>
            <div className={labelsStyles.nameContainer}>
              <input
                type="text"
                name="name"
                placeholder="Label Name"
                className={labelsStyles.nameInput}
                autoComplete="off"
                value={labelData.title}
                onChange={inputHandler}
                onKeyUp={(event) => validationHandler(event, setIsValid)}
                ref={nameInput}
              />
            </div>
            <div className={labelsStyles.colorInputContainer}>
              <label htmlFor="favcolor">Select your favorite color</label>
              <input
                className={labelsStyles.colorInput}
                id="favcolor"
                type="color"
                name="color"
                value={labelData.color}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className={labelsStyles.buttons}>
            <button
              type="submit"
              className={`add-button ${isValid ? "" : "invalid-task"}`}
            >
              Add Label
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={cancelLabel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLabelModal;
