import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "@public/assets/css/bootstrap.min.css";
import "@public/assets/css/style.css";
import "@public/assets/css/change.css";
import "@public/assets/lib/animate/animate.min.css";
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);
