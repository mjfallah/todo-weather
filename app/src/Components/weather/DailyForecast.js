import React, { useContext, useState } from "react";

// WeatherContext
import { WeatherContext } from "./WeatherContextProvider";

// Components
import Chart from "./Chart";

// Styles
import dailyStyles from "./DailyForecast.module.css";

const changeDate = (date) => {
  return new Intl.DateTimeFormat("EN", {
    month: "short",
    weekday: "short",
    day: "numeric",
  }).format(new Date(date));
};

const DailyForecast = () => {
  const { data, dispatch } = useContext(WeatherContext);

  const [activeDay , setActiveDay] = useState({
    0: true,
    1: false,
    2: false
  });
  const changeDay = (event) => {
    const DAY =event.target.getAttribute("dataindex");
    dispatch({
      type: "changingDay",
      day: DAY,
    });
    if(DAY==="0"){
      setActiveDay({
        0: true,
        1: false,
        2: false
      });
    }else if (DAY==="1") {
      setActiveDay({
        0: false,
        1: true,
        2: false
      });
    }else if (DAY === "2") {
      setActiveDay({
        0: false,
        1: false,
        2: true
      });
    };
  };

  return (
    <div className={dailyStyles.mainContainer}>
      {data.dailyForecastData && (
        <div className={dailyStyles.container}>
          <div className={dailyStyles.daysContainer}>
            {data.forecastData.forecast.forecastday.map((day, index) => (
              <span
                key={day.date}
                dataindex={index}
                onClick={changeDay}
                className={`${dailyStyles.day} , ${activeDay[index] ? dailyStyles.activeDay : ''}`}
              >
                {changeDate(day.date)}
              </span>
            ))}
          </div>
          <div className={dailyStyles.info}>
            <div className={dailyStyles.details}>
              <div className={dailyStyles.temprature}>
                <div className={dailyStyles.detail}>
                  maximum temprature (°C): <span>{data.dailyForecastData.day.maxtemp_c}</span>
                </div>
                <div className={dailyStyles.detail}>
                  average temprature (°C): <span>{data.dailyForecastData.day.avgtemp_c}</span>
                </div>
                <div className={dailyStyles.detail}>
                  minimum temprature (°C): <span>{data.dailyForecastData.day.mintemp_c}</span>
                </div>
              </div>
              <div className={dailyStyles.icon}>
                <img
                  src={data.dailyForecastData.day.condition.icon}
                  alt="weatherIcon"
                />
                <span>{data.dailyForecastData.day.condition.text}</span>
              </div>
              <div className={dailyStyles.temprature}>
                <div className={dailyStyles.detail}>
                  maximum wind speed (km/h): <span>{data.dailyForecastData.day.maxwind_kph}</span>
                </div>
                <div className={dailyStyles.detail}>
                  total precipitation (mm): 
                  <span>{data.dailyForecastData.day.totalprecip_mm}</span>
                </div>
                <div className={dailyStyles.detail}>
                  average humidity percentage: <span>{data.dailyForecastData.day.avghumidity} </span>
                </div>
              </div>
            </div>
            <div className={dailyStyles.sun}>
              <div className={dailyStyles.sunrise}><div className={dailyStyles.detail}>sunrise <span>{data.dailyForecastData.astro.sunrise}</span></div></div>
              <div className={dailyStyles.sunset}><div className={dailyStyles.detail}>sunset <span>{data.dailyForecastData.astro.sunset}</span></div></div>
            </div>
            <div className={dailyStyles.chart}>
              <Chart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
