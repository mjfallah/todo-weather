import React, { useState } from "react";

// Components
import EditModal from "../EditModal/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";

// Styles
import activitiesStyles from "./CompeletedItem.module.css";

// Functions
import { changeDate } from "../../../Functions";

const CompeletedItem = ({
  title,
  description,
  date,
  label,
  labelColor,
  priority,
  priorityColor,
  deleteHandler,
}) => {
  const [editModalIsShown, setEditModalIsShown] = useState(false);

  const editModalHandler = () => {
    setEditModalIsShown(!editModalIsShown);
  };

  return (
    <div className={activitiesStyles.container}>
      <div className={activitiesStyles.checkBox}>
        <div className={activitiesStyles.info}>
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
      <div className={activitiesStyles.iconsContainer}>
        <div className={activitiesStyles.tagsAndFlagIcons}>
          <div
            className={label ? activitiesStyles.tagIcon : ""}
            data-name={label}
          >
            <FontAwesomeIcon icon={["fas", "tags"]} color={labelColor} />
          </div>
          <div
            className={priority ? activitiesStyles.flagIcon : ""}
            data-name={priority}
          >
            <FontAwesomeIcon icon={["fas", "flag"]} color={priorityColor} />
          </div>
        </div>
        <div className={activitiesStyles.editAndTrashIcons}>
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
          type="EDIT_COMPLETED"
        />
      </CSSTransition>
    </div>
  );
};

export default CompeletedItem;
