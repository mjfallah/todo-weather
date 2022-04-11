import React, { useState, useContext } from "react";

// Styles
import priorityStyles from "./Priorities.module.css";

//Components
import FilteredTasks from "../Labels/FilteredTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

const Priorities = () => {
  const { toDos } = useContext(ToDoContext);

  const [currentPriority, setCurrentPriority] = useState("");
  
  const [allTasks, setAllTasks] = useState([]);

  const selectPriorityHandler = (event) => {
    setCurrentPriority(event.target.value);
    arrayMixer();
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
  return (
    <div className={priorityStyles.container}>
      <div className={priorityStyles.title}>
        <div>
          <FontAwesomeIcon icon={["fas", "check"]} fixedWidth />
        </div>
        <h3>You can filter and see specific tasks with a certain priority.</h3>
      </div>
      <div className={priorityStyles.filterTasks}>
        <div className={priorityStyles.Priorities}>
          <select value={currentPriority} onChange={selectPriorityHandler}>
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
        <FilteredTasks
          allTasks={allTasks}
          filterCategory="priority"
          dataForFiltering={currentPriority}
          arrayMixer={arrayMixer}
        />
      </div>
    </div>
  );
};

export default Priorities;
