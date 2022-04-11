import React, { useState, useContext, useEffect } from "react";

// ToDoContext
import { ToDoContext } from "../ToDoContextProvider";

//Functions
import { labelColorFinder, priorityColorFinder } from "../../../Functions";

// Components
import Task from "./Task";

// Styles
import SearchTaskStyles from "./SearchTask.module.css";

const SearchTask = () => {
  const { toDos } = useContext(ToDoContext);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [result, setResult] = useState([]);

  const inputValueHandler = (event) => {
    setSearchInputValue(event.target.value);
  };

  const serachTaskHandler = () => {
    const allTasks = [];
    const searchedTasks = [];
    for (const category in toDos) {
      if (
        category === "overDue" ||
        category === "scheduled" ||
        category === "checked"
      ) {
        allTasks.push(...toDos[category]);
      }
    }
    searchInputValue
      ? allTasks.forEach((item) => {
          if (
            item.title.toLowerCase().includes(searchInputValue.toLowerCase())
          ) {
            searchedTasks.push(item);
          } else if (
            item.description
              .toLowerCase()
              .includes(searchInputValue.toLowerCase())
          ) {
            searchedTasks.push(item);
          } else if (
            item.title.toLowerCase().includes(searchInputValue.toLowerCase())
          ) {
            searchedTasks.push(item);
          }
          setResult([...searchedTasks]);
        })
      : setResult([]);
  };

  useEffect(() => {
    serachTaskHandler();
  }, [searchInputValue]);

  return (
    <div className={SearchTaskStyles.searchBox}>
      <input
        type="search"
        placeholder=" search task ..."
        value={searchInputValue}
        onChange={inputValueHandler}
      />
      {result.length ? (
        <div className={SearchTaskStyles.results}>
          {result.map((item) => (
            <Task
              key={Math.random()}
              title={item.title}
              date={item.date}
              description={item.description}
              label={item.label}
              labelColor={labelColorFinder(toDos, item.label)}
              priority={item.priority}
              priorityColor={priorityColorFinder(item.priority)}
              setSearchInputValue={setSearchInputValue}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchTask;
