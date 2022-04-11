import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// importing styles
import "./index.css";

// importing App Component
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
