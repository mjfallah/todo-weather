import React, { useState } from "react";

// Styles
import styles from "./ScheduledItem.module.css";

// Components
import EditModal from "./EditModal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";

// Functions
import { changeDate } from "../../Functions";

const ScheduledItem = ({
  title,
  description,
  date,
  label,
  labelColor,
  priority,
  priorityColor,
  checkHandler,
  deleteHandler,
}) => {
  const [editModalIsShown, setEditModalIsShown] = useState(false);

  const editModalHandler = () => {
    setEditModalIsShown(!editModalIsShown);
  };
  return (
    <div className={styles.container}>
      <div className={styles.checkBox}>
        <div>
          <button onClick={checkHandler} type="button"></button>
        </div>
        <div className={styles.info}>
          <h4>{title}</h4>
          <p>{description}</p>
          <p>
            <span>
              <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
            </span>
            {changeDate(date)}
          </p>
        </div>
      </div>
      <div className={styles.iconsContainer}>
        <div className={styles.tagsAndFlagIcons}>
          <div className={label ? styles.tagIcon : ""} data-name={label}>
            <FontAwesomeIcon icon={["fas", "tags"]} color={labelColor} />
          </div>
          <div className={priority ? styles.flagIcon : ""} data-name={priority}>
            <FontAwesomeIcon icon={["fas", "flag"]} color={priorityColor} />
          </div>
        </div>
        <div className={styles.editAndTrashIcons}>
          <div onClick={editModalHandler}>
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </div>
          <div onClick={deleteHandler}>
            <FontAwesomeIcon icon={["fas", "trash"]} />
          </div>
        </div>
      </div>
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
          type="EDIT_TODO"
        />
      </CSSTransition>
    </div>
  );
};

export default ScheduledItem;
