import React, { useState } from "react";

// Components
import Menu from "../Menu/Menu";
import SearchTask from "../SearchTask/SearchTask";
import ToDoModal from "../ToDoModal/ToDoModal";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuIsSHown, setMenuIsShown] = useState(false);

  const [modalIsShown, setModalIsShown] = useState(false);

  const modalHandler = () => {
    setModalIsShown(!modalIsShown);
  };

  const menuHandler = () => {
    setMenuIsShown(!menuIsSHown);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.leftBtns}>
          <div className={styles.barsIcon} onClick={menuHandler}>
            <FontAwesomeIcon
              icon={["fas", menuIsSHown ? "times" : "bars"]}
              size="2x"
            />
          </div>
          <Link to="/">
            <FontAwesomeIcon icon={["fas", "home"]} size="2x" />
          </Link>
        </div>
        <div className={styles.searchContainer}>
          <SearchTask />
        </div>
        <div className={styles.rightBtns}>
          <div>
            <button
              type="button"
              className={styles.addBtn}
              onClick={modalHandler}
            >
              Add Task
            </button>
          </div>

          <CSSTransition
            in={modalIsShown}
            timeout={{ enter: 300, exit: 500 }}
            classNames={"modal-"}
            unmountOnExit={true}
          >
            <ToDoModal addModalDisplayHandler={modalHandler} />
          </CSSTransition>

          <div className={styles.weatherIcon}>
            <Link to="/weather">
              <FontAwesomeIcon icon={["fas", "cloud-sun-rain"]} size="2x" />
            </Link>
          </div>
          <div className={styles.userIcon}>
            <span>Hi User</span>
            <span>
              <FontAwesomeIcon icon={["fas", "user"]} size="2x" />
            </span>
          </div>
        </div>
      </div>
      <div className={menuIsSHown ? styles.showMenu : styles.hideMenu}>
        <Menu menuHandler={menuHandler} />
      </div>
    </div>
  );
};

export default Navbar;
