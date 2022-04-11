import React, { useState, useContext } from "react";

// Styles
import labelsStyles from "./Labels.module.css";

// Components
import AddLabelModal from "./AddLabelModal";
import FilteredTasks from "./FilteredTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

const Labels = () => {
  const { toDos, dispatch } = useContext(ToDoContext);

  const [modalIsShown, setModalIsShown] = useState(false);

  const [currentLabel, setCurrentLabel] = useState("");

  const [allTasks, setAllTasks] = useState([]);

  const selectLabelHandler = (event) => {
    setCurrentLabel(event.target.value);
    arrayMixer();
  };
  const modalHandler = () => {
    setModalIsShown(!modalIsShown);
  };
  const arrayMixer = () => {
    const tasks = [];
    for (const category in toDos) {
      if (
        category === "overDue" ||
        category === "scheduled" ||
        category === "checked"
      ) {
        tasks.push(...toDos[category]);
      }
    }
    setAllTasks([...tasks]);
  };
  const deleteLabelHandler = (labelName) => {
    dispatch({ type: "DELETE_LABEL", payLoad: labelName });
  };
  return (
    <div className={labelsStyles.mainContainer}>
      <div className={labelsStyles.subContainer}>
        <div className={labelsStyles.title}>
          <div>
            <FontAwesomeIcon icon={["fas", "check"]} fixedWidth />
          </div>
          <h3>You can define labels here to mark your tasks .</h3>
        </div>
        <h4>
          you can also filter and see specific tasks marked with a certain
          label.
        </h4>

        <div className={labelsStyles.addBtn}>
          <button type="button" onClick={modalHandler}>
            Add New Label
          </button>
        </div>
        <div className={labelsStyles.labelsList}>
          <div>
            <span>Your List Of Labels</span>
          </div>
          <div>
            {toDos.labels.length ? (
              toDos.labels.map((label) => (
                <div key={Math.random()} className={labelsStyles.label}>
                  <span>
                    <FontAwesomeIcon
                      icon={["fas", "tags"]}
                      color={label.color}
                    />
                  </span>
                  <span>{label.name}</span>
                  <span
                    className={labelsStyles.labelTrash}
                    onClick={() => deleteLabelHandler(label.name)}
                  >
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                  </span>
                </div>
              ))
            ) : (
              <p>You Haven't defined any label !</p>
            )}
          </div>
        </div>
      </div>
      <div className={labelsStyles.filterTasks}>
        <div className={labelsStyles.labels}>
          <select value={currentLabel} onChange={selectLabelHandler}>
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
        <FilteredTasks
          allTasks={allTasks}
          filterCategory="label"
          dataForFiltering={currentLabel}
          arrayMixer={arrayMixer}
        />
      </div>
      <CSSTransition
        in={modalIsShown}
        timeout={{ enter: 300, exit: 500 }}
        classNames={"modal-"}
        unmountOnExit={true}
      >
        <AddLabelModal displayHandler={modalHandler} />
      </CSSTransition>
    </div>
  );
};

export default Labels;
