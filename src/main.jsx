import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
// import "/assets/css/bootstrap.min.css";
// import "/assets/css/style.css";
// import "/assets/css/change.css";
// import "/assets/lib/animate/animate.min.css";
import { Provider } from "react-redux";
import store from "@src/app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
//         <React.StrictMode>
// </React.StrictMode>
