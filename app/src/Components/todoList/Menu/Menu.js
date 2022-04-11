import React from "react";

// Components
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import menuStyles from "./Menu.module.css";

const Menu = ({ menuHandler }) => {
  return (
    <div>
      <ul>
        <li onClick={menuHandler}>
          <Link to="/activities" className={menuStyles.item}>
            <span className={menuStyles.menuIcon}>
              <FontAwesomeIcon
                icon={["fas", "calendar-check"]}
                size="2x"
                transform="shrink-3 "
                fixedWidth
              />
            </span>
            <span className={menuStyles.menuTitle}>Activity</span>
          </Link>
        </li>
        <li onClick={menuHandler}>
          <Link to="/upcoming" className={menuStyles.item}>
            <span className={menuStyles.menuIcon}>
              <FontAwesomeIcon
                icon={["fas", "calendar-alt"]}
                size="2x"
                transform="shrink-3 "
                fixedWidth
              />
            </span>
            <span className={menuStyles.menuTitle}>Upcoming</span>
          </Link>
        </li>
        <li onClick={menuHandler}>
          <Link to="/labels" className={menuStyles.item}>
            <span className={menuStyles.menuIcon}>
              <FontAwesomeIcon
                icon={["fas", "tags"]}
                size="2x"
                transform="shrink-4 right-1 down-1"
                fixedWidth
              />
            </span>
            <span className={menuStyles.menuTitle}>Labels</span>
          </Link>
        </li>
        <li onClick={menuHandler}>
          <Link to="/priorities" className={menuStyles.item}>
            <span className={menuStyles.menuIcon}>
              <FontAwesomeIcon
                icon={["fas", "flag"]}
                size="2x"
                transform="shrink-3 down-1"
                fixedWidth
              />
            </span>
            <span className={menuStyles.menuTitle}>Priorities</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
