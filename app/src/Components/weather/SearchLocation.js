import React, { useEffect, useState, useContext } from "react";

// axios library
import axios from "axios";

// WeatherContext
import { WeatherContext } from "./WeatherContextProvider";

// Styles
import searchStyles from "./SearchLocation.module.css";

const SearchLocation = () => {
  const { dispatch } = useContext(WeatherContext);

  const [text, setText] = useState("");
  
  const [result, setResult] = useState([]);

  const changeHandler = (event) => {
    setText(event.target.value);
  };

  const resultHandler = () => {
    text
      ? axios
          .get(
            `https://api.weatherapi.com/v1/search.json?key=24b9573573dd4963829153359222101&q=${text}`
          )
          .then((result) =>
            result.data.filter((item) =>
              item.name.toLowerCase().includes(text.toLowerCase())
            )
          )
          .then((finalRes) => setResult(finalRes))
      : setResult([]);
  };

  const changeLocation = (lat, lon) => {
    dispatch({ type: "changingLocation", latitude: lat, longitude: lon });
    setResult([]);
    setText("");
  };

  useEffect(() => {
    resultHandler();
  }, [text]);

  return (
    <div className={searchStyles.container}>
      <input
        type="search"
        value={text}
        onChange={changeHandler}
        placeholder="Search Any Location ..."
      />
      {result.length ? (
        <div className={searchStyles.results}>
          {result.map((item) => (
            <div
              key={item.id}
              onClick={() => changeLocation(item.lat, item.lon)}
              className={searchStyles.result}
            >
              <span>{item.name} , {item.region} , {item.country}</span>
              <span className={searchStyles.resultItemBadge}></span>
            </div> 
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchLocation;
