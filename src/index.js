import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom"
import ErrorBoundary from "./ErrorBoundary"

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById("root")
  );
