import React, { useContext } from "react";

// Componenets
import Task from "../SearchTask/Task";

// Styles
import labelsStyles from "./Labels.module.css";

// TodoContext
import { ToDoContext } from "../ToDoContextProvider";

// Functions
import { labelColorFinder, priorityColorFinder } from "../../../Functions";

const FilteredTasks = ({
  allTasks,
  filterCategory,
  dataForFiltering,
  arrayMixer,
}) => {
  const { toDos } = useContext(ToDoContext);

  return (
    <div className={labelsStyles.tasks}>
      {allTasks.length ? (
        allTasks
          .filter((task) => task[filterCategory] === dataForFiltering)
          .map((task) => (
            <Task
              key={Math.random()}
              title={task.title}
              date={task.date}
              description={task.description}
              label={task.label}
              labelColor={labelColorFinder(toDos, task.label)}
              priority={task.priority}
              priorityColor={priorityColorFinder(task.priority)}
              filteredTasksWithLabelOrPriorityHandler={arrayMixer}
            />
          ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FilteredTasks;
