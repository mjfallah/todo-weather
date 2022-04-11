import React, { useContext, useEffect, useState } from "react";

// WeatherContext
import { WeatherContext } from "./WeatherContextProvider";

// Styles
import chartStyles from "./Chart.module.css";

// Chart.js 
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  Title,
  SubTitle,
  LineController,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  Title,
  SubTitle,
  LineController
);

const Chart = () => {
  const { data, dispatch } = useContext(WeatherContext);

  const [activeChart , setActiveChart] = useState({
    temp_c: true,
    wind_kph: false,
    precip_mm: false
  });

  const changeChart = (event) => {
    const chartType = event.target.getAttribute("datakey");
    dispatch({
      type: "changingChartType",
      day: event.target.getAttribute("dataday"),
      typeOfChart: event.target.getAttribute("datatype"),
      typeKey: chartType,
    });
    if(chartType === "temp_c"){
      setActiveChart({
        temp_c: true,
        wind_kph: false,
        precip_mm: false
      });
    }else if (chartType === "wind_kph") {
      setActiveChart({
        temp_c: false,
        wind_kph: true,
        precip_mm: false
      });
    }else if (chartType === "precip_mm") {
      setActiveChart({
        temp_c: false,
        wind_kph: false,
        precip_mm: true
      });
    };
  };
  
  useEffect(()=> {
    setActiveChart({
      temp_c: true,
      wind_kph: false,
      precip_mm: false
    });
  },[data.currentDay])

  return (
    <div>
      {data && (
        <div className={chartStyles.chartType}>
          <div
            datatype="temprature (°C)"
            datakey="temp_c"
            dataday={data.currentDay}
            onClick={changeChart}
            className={activeChart["temp_c"] ? chartStyles.active : undefined}
          >
            Temprature
          </div>
          <div
            datatype="wind speed (km/h)"
            datakey="wind_kph"
            dataday={data.currentDay}
            onClick={changeChart}
            className={activeChart["wind_kph"] ? chartStyles.active : undefined}
          >
            Wind Speed
          </div>
          <div
            datatype="precipitation (mm)"
            datakey="precip_mm"
            dataday={data.currentDay}
            onClick={changeChart}
            className={activeChart["precip_mm"] ? chartStyles.active : undefined}
          >
            Precipitation
          </div>
        </div>
      )}

      {data.chartYAxis && (
        <Line
          data={{
            labels: data.timeAxis,
            datasets: [
              {
                data: data.chartYAxis,
                label: data.chartType,
                backgroundColor: "blue",
                borderColor: "red",
              },
            ],
          }}
          options={{
            title: {
              display: true,
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                fontSize: 35,
                fontColor: "green",
              },
            },
          }}
        />
      )}
      
    </div>
  );
};

export default Chart;
