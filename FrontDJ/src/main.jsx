import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import "./index.css";

import store from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
