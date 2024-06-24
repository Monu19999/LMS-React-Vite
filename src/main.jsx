import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.jsx";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@src/app/store";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
//         <React.StrictMode>
// </React.StrictMode>
