import React, { useContext } from "react";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

// Component
import ScheduledItem from "../ScheduledItem";

// Styles
import upcomingStyles from "./Upcoming.module.css";

// Functions
import { today, labelColorFinder, priorityColorFinder } from "../../../Functions";

const Upcoming = () => {
  const { toDos, dispatch } = useContext(ToDoContext);

  const upComingToDos = toDos.scheduled.filter((item) => item.date !== today);

  const checkTask = (title) => {
    dispatch({ type: "Checked", itemTitle: title });
  };
  const deleteTask = (title, category) => {
    dispatch({ type: "Delete", itemTitle: title, itemCategory: category });
  };
  
  return (
    <div className={upcomingStyles.mainContainer}>
      <div className={upcomingStyles.subContainer}>
        <h1 className={upcomingStyles.pageTitle}>Upcoming</h1>
        <div className={upcomingStyles.scheduled}>
          <div className={upcomingStyles.headLine}>
            <h3>Upcoming Tasks</h3>
            <span>{upComingToDos.length > 0 && upComingToDos.length}</span>
          </div>
          <div className={upcomingStyles.items}>
            {upComingToDos.length ? (
              toDos.scheduled
                .filter((item) => item.date > today)
                .map((item) => (
                  <ScheduledItem
                    key={Math.random()}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    label={item.label}
                    labelColor={labelColorFinder(toDos, item.label)}
                    priority={item.priority}
                    priorityColor={priorityColorFinder(item.priority)}
                    checkHandler={() => checkTask(item.title)}
                    deleteHandler={() => deleteTask(item.title, "scheduled")}
                  />
                ))
            ) : (
              <h4>you have nothing scheduled !</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
