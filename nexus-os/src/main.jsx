/** @format */

import React from "react";
import ReactDOM from "react-dom/client";

// ۱. ایمپورت فونت Inter (وزن‌های مورد نیاز)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

// ۲. ایمپورت استایل گلوبال (که theme.css را لود می‌کند)
import "./index.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
