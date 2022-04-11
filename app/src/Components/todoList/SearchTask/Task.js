import React, { useState, useContext } from "react";

// Styles
import SearchTaskStyles from "./SearchTask.module.css";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

// Components
import EditModal from "../EditModal/EditModal";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Task = ({
  title,
  date,
  description,
  label,
  labelColor,
  priority,
  priorityColor,
  setSearchInputValue,
  filteredTasksWithLabelOrPriorityHandler,
}) => {
  const { toDos } = useContext(ToDoContext);

  const dateFormatter = (date) => {
    const newFormat = new Intl.DateTimeFormat("EN", {
      month: "short",
      weekday: "short",
      day: "2-digit",
    }).formatToParts(new Date(date));
    return `${newFormat[0].value}  ${newFormat[4].value} ${newFormat[2].value}`;
  };

  const [editModalIsShown, setEditModalIsShown] = useState(false);

  const editModalHandler = () => {
    setEditModalIsShown(!editModalIsShown);
  };

  const showTaskModal = () => {
    editModalHandler();
  };

  const overDueIndex = toDos.overDue.findIndex((task) => task.title === title);
  const scheduledIndex = toDos.scheduled.findIndex((task) => task.title === title);
  const checkedIndex = toDos.checked.findIndex((task) => task.title === title);

  return (
    <div
      key={Math.random()}
      className={SearchTaskStyles.result}
      onClick={showTaskModal}
    >
      <div className={SearchTaskStyles.headInfo}>
        <span className={SearchTaskStyles.title}>{title}</span>
        <div>
          <span className={SearchTaskStyles.labelColorBadge}>
            <FontAwesomeIcon icon={["fas", "tags"]} color={labelColor} />
          </span>
          <span className={SearchTaskStyles.priorityColorBadge}>
            <FontAwesomeIcon icon={["fas", "flag"]} color={priorityColor} />
          </span>
          {overDueIndex >= 0 ? (
            <span className={SearchTaskStyles.overDueBadge}>overdue</span>
          ) : checkedIndex >= 0 ? (
            <span className={SearchTaskStyles.checkedBadge}>Done</span>
          ) : (
            <span></span>
          )}
          <span className={SearchTaskStyles.date}>{dateFormatter(date)}</span>
        </div>
      </div>
      <span className={SearchTaskStyles.description}>{description}</span>
      <CSSTransition
        in={editModalIsShown}
        timeout={{ enter: 300, exit: 500 }}
        classNames={"modal-"}
        unmountOnExit={true}
      >
        <EditModal
          editDisplayHandler={editModalHandler}
          editTitle={title}
          editDescription={description}
          editDate={date}
          editLabel={label}
          editPriority={priority}
          setSearchInputValue={setSearchInputValue}
          filteredTasksWithLabelOrPriorityHandler={
            filteredTasksWithLabelOrPriorityHandler
          }
          type={
            overDueIndex >= 0
              ? "RE_SCHEDULE"
              : scheduledIndex >= 0
              ? "EDIT_TODO"
              : "EDIT_COMPLETED"
          }
        />
      </CSSTransition>
    </div>
  );
};

export default Task;
