import React, { useContext } from "react";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

// Component
import CompeletedItem from "./CompeletedItem";

// Functions
import { labelColorFinder, priorityColorFinder } from "../../../Functions";

// Styles
import activitiesStyle from "./Activities.module.css";

const Activities = () => {
  const { toDos, dispatch } = useContext(ToDoContext);

  const deleteTask = (title, category) => {
    dispatch({ type: "Delete", itemTitle: title, itemCategory: category });
  };
  return (
    <div className={activitiesStyle.mainContainer}>
      <div className={activitiesStyle.subContainer}>
        <h1 className={activitiesStyle.pageTitle}>Activities</h1>
        <div className={activitiesStyle.activities}>
          <div className={activitiesStyle.headLine}>
            <h3>Your Compeleted Tasks</h3>
            <span>{toDos.checked.length > 0 && toDos.checked.length}</span>
          </div>
          <div className={activitiesStyle.items}>
            {toDos.checked.length ? (
              toDos.checked.map((item) => (
                <CompeletedItem
                  key={Math.random()}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  label={item.label}
                  labelColor={labelColorFinder(toDos, item.label)}
                  priority={item.priority}
                  priorityColor={priorityColorFinder(item.priority)}
                  deleteHandler={() => deleteTask(item.title, "checked")}
                />
              ))
            ) : (
              <h4>You have NOT completed any task yet!</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
