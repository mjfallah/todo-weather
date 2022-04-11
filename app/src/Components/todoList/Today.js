import React, { useContext } from "react";

// ToDoContext
import { ToDoContext } from "./ToDoContextProvider";

// Styles
import "./Today.css";

// Components
import ScheduledItem from "./ScheduledItem";
import OverDueItem from "./OverDueItem";

// Functions
import { today, labelColorFinder, priorityColorFinder } from "../../Functions";

//generates today's date like : Sun 03 Apr
const date = new Intl.DateTimeFormat("EN", {
  month: "short",
  weekday: "short",
  day: "2-digit",
}).formatToParts();

const Today = () => {
  const { toDos, dispatch } = useContext(ToDoContext);

  const todayToDOs = toDos.scheduled.filter((item) => item.date === today);

  const checkTask = (title) => {
    dispatch({ type: "Checked", itemTitle: title });
  };
  const deleteTask = (title, category) => {
    dispatch({ type: "Delete", itemTitle: title, itemCategory: category });
  };

  return (
    <div className="mainContainer">
      <div className="subContainer">
        <h1 className="pageTitle">
          Today
          <span>
            {date[0].value} {date[4].value} {date[2].value}
          </span>
        </h1>

        <div className="overDue">
          <div className="overDue-headLine">
            <h3>OverDue Tasks</h3>
            <span>{toDos.overDue.length > 0 && toDos.overDue.length}</span>
          </div>
          <div className="items">
            {toDos.overDue.length ? (
              toDos.overDue.map((item) => (
                <OverDueItem
                  key={Math.random()}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  label={item.label}
                  labelColor={labelColorFinder(toDos, item.label)}
                  priority={item.priority}
                  priorityColor={priorityColorFinder(item.priority)}
                  checkHandler={() => checkTask(item.title)}
                  deleteHandler={() => deleteTask(item.title, "overDue")}
                />
              ))
            ) : (
              <h4>Good! Every thing has been takan care of</h4>
            )}
          </div>
        </div>

        <div className="scheduled">
          <div className="scheduled-headLine">
            <h3>Scheduled Tasks for today</h3>
            <span>{todayToDOs.length > 0 && todayToDOs.length}</span>
          </div>
          <div className="items">
            {todayToDOs.length ? (
              todayToDOs.map((item) => (
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
              <h4>You have nothing to do for today</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
