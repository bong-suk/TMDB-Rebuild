import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Context Providers
import { UserProvider } from "./contexts/UserContext";
import { SupabaseProvider } from "./contexts/useSupabaseAuth";
// Router
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
