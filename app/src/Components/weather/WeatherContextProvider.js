import React, { createContext, useEffect, useReducer } from "react";

// axios library
import axios from "axios";

const initialData = {
  isLoading: true,
  currentLocation: "35.73,51.33",
  forecastData: null,
  dailyForecastData: null,
  chartYAxis: [], // an array of numbers ; dama or wind speed or precipitation (y axis)
  timeAxis: [], // an array of numbers ; time axis (x axis)
  chartType: "",
  currentDay: 0,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        ...state,
        isLoading: false,
        forecastData: action.payLoad,
        dailyForecastData: action.payLoad.forecast.forecastday[0],
        chartYAxis: action.payLoad.forecast.forecastday[0].hour.map(
          (item) => item.temp_c
        ),
        timeAxis: action.payLoad.forecast.forecastday[0].hour.map(
          (item) => item.time.split(" ")[1]
        ),
        chartType: "temprature (°C)",
      };
    case "changingLocation":
      return {
        ...state,
        currentLocation: `${action.latitude},${action.longitude}`,
      };
    case "changingChartType":
      return {
        ...state,
        chartType: action.typeOfChart,
        chartYAxis: state.forecastData.forecast.forecastday[
          action.day
        ].hour.map((item) => item[action.typeKey]),
      };
    case "changingDay":
      return {
        ...state,
        currentDay: action.day,
        chartType: "temprature (°C)",
        dailyForecastData: state.forecastData.forecast.forecastday[action.day],
        chartYAxis: state.forecastData.forecast.forecastday[
          action.day
        ].hour.map((item) => item.temp_c),
      };
    case "failure":
      return {
        ...state,
        isLoading: false,
        forecastData: null,
        dailyForecastData: null,
        chartYAxis: [],
        timeAxis: [],
        chartType: "",
        error: "error in HTTP request",
      };
    default:
      return state;
  }
};

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=24b9573573dd4963829153359222101&q=${data.currentLocation}&days=3&aqi=yes&alerts=no`
      )
      .then((response) => dispatch({ type: "success", payLoad: response.data }))
      .catch((error) => dispatch({ type: "failure" }));
  }, [data.currentLocation]);

  return (
    <WeatherContext.Provider value={{ data, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
