import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import FoodListContextProvider from "./Context/foodList-context";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <FoodListContextProvider>
        <App />
      </FoodListContextProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
