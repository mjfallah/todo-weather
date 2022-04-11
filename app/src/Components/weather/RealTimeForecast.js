import React, { useContext } from "react";

// WeatherContext
import { WeatherContext } from "./WeatherContextProvider";

// Styles
import realTimeStyles from "./RealTimeForecast.module.css";

// Components
import SearchLocation from "./SearchLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RealTimeForecast = () => {
  const { data } = useContext(WeatherContext);

  const airPollution = (pollutionDose) => {
    switch (pollutionDose) {
      case 6:
        return "Hazardous";
      case 5:
        return "Very Unhealthy";
      case 4:
        return "Unhealthy";
      case 3:
        return "Unhealthy for sensitive group";
      case 2:
        return "Moderate";
      case 1:
        return "Good";
    }
  };

  return (
    <div className={realTimeStyles.mainContainer}>
      {data.forecastData && (
        <div className={realTimeStyles.container}>
          <div className={realTimeStyles.locationInfo}>
            <div className={realTimeStyles.updateTime}>
              <span>
                Last Update{" "}
                {data.forecastData.current.last_updated.split(" ")[1]}
              </span>
            </div>
            <div className={realTimeStyles.locationName}>
              <span>
                {data.forecastData.location.name} ,
                {data.forecastData.location.region &&
                  data.forecastData.location.region}
                , {data.forecastData.location.country}
              </span>
              <span className={realTimeStyles.icon}>
                <FontAwesomeIcon
                  icon={["fas", "circle"]}
                  transform="shrink-10 up-2.5"
                  mask={["fas", "map-marker"]}
                />
              </span>
            </div>
            <div className={realTimeStyles.searchInput}>
              <SearchLocation />
            </div>
          </div>
          <div className={realTimeStyles.weatherInfo}>
            <img
              src={data.forecastData.current.condition.icon}
              className={realTimeStyles.img}
              alt="weatherIcon"
            />
            <div>
              <span className={realTimeStyles.temp}>
                {data.forecastData.current.temp_c}
                °C
              </span>
              <span className={realTimeStyles.condition}>
                {data.forecastData.current.condition.text}
              </span>
            </div>
          </div>
          <div className={realTimeStyles.weatherDetails}>
            <div>
              <span className={realTimeStyles.icon}>
                <FontAwesomeIcon
                  icon={["fas", "compass"]}
                  size="2x"
                  fixedWidth
                />
              </span>
              <span>Wind Direction : {data.forecastData.current.wind_dir}</span>
            </div>
            <div>
              <span className={realTimeStyles.icon}>
                <FontAwesomeIcon icon={["fas", "wind"]} size="2x" fixedWidth />
              </span>
              <span>Wind Speed : {data.forecastData.current.wind_kph} km/h</span>
            </div>
            <div>
              <span className={realTimeStyles.icon}>
                <FontAwesomeIcon
                  icon={["fas", "percentage"]}
                  transform="shrink-10 right-0.5 down-0.7"
                  size="2x"
                  mask={["fas", "tint"]}
                  fixedWidth
                />
              </span>
              <span>Humidity Percentage : {data.forecastData.current.humidity}</span>
            </div>
            <div>
              <span className={realTimeStyles.icon}>
                <FontAwesomeIcon
                  icon={["fas", "head-side-mask"]}
                  size="2x"
                  fixedWidth
                />
              </span>
              <span>Air Polution Status :  
                <span>
                  {airPollution(
                    data.forecastData.current.air_quality["us-epa-index"]
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeForecast;
