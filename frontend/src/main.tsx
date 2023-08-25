import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { config } from "./Config";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL = config.urls.API_BASE_URL;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
