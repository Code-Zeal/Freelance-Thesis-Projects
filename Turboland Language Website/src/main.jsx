import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import 'preline';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(
  <main>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </main>
);
