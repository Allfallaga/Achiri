import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store.js"; // Ajout de .js
import "./index.css";
import App from "./App.js"; // Ajout de .js
import ErrorBoundary from "./ErrorBoundary.js"; // Ajout de .js
import reportWebVitals from "./reportWebVitals.js"; // Ajout de .js
import "./i18n.js"; // Ajout de .js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();