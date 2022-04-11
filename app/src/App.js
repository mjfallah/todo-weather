import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// importing components
import Navbar from "./Components/todoList/Navbar/Navbar";
import Weather from "./Components/weather/Weather";
import Today from "./Components/todoList/Today";
import Upcoming from "./Components/todoList/Upcoming/Upcoming";
import Activities from "./Components/todoList/Activities/Activities";
import Labels from "./Components/todoList/Labels/Labels";
import Priorities from "./Components/todoList/Priorities/Priorities";

// importing ToDo & Weather context
import WeatherContextProvider from "./Components/weather/WeatherContextProvider";
import ToDoContextProvider from "./Components/todoList/ToDoContextProvider";

// importing fontawesome library
import "./fontAwesome";

const App = () => {
  return (
    <div>
      <ToDoContextProvider>
        <WeatherContextProvider>
          <Navbar />
          <Routes>
            <Route path="/weather" element={<Weather />} />
            <Route path="/" element={<Today />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="/priorities" element={<Priorities />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
        </WeatherContextProvider>
      </ToDoContextProvider>
    </div>
  );
};

export default App;
