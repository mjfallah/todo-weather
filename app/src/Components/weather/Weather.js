import React, { useContext } from "react";

// WeatherContext
import { WeatherContext } from "./WeatherContextProvider";

// Styles
import weatherStyles from "./Weather.module.css";

// Components
import RealTimeForecast from "./RealTimeForecast";
import DailyForecast from "./DailyForecast";
import Spinner from "./Spinner";

const Weather = () => {
  const { data } = useContext(WeatherContext);
  return (
    <div className={weatherStyles.mainContainer}>
      {!data.isLoading ? (
        <div className={weatherStyles.container}>
          <RealTimeForecast />
          <DailyForecast />
        </div>
      ) : (
        <div className={weatherStyles.loading}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Weather;
