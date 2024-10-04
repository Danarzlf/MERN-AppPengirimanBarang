import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import { DropPointContextProvider } from "./context/DropPointContext";
import { CityContextProvider } from "./context/CityContext";
import { TrackContextProvider } from "./context/TrackContext";
import { ShipmentContextProvider } from "./context/ShipmentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProfileContextProvider>
          <DropPointContextProvider>
            <CityContextProvider>
             <TrackContextProvider>
              <ShipmentContextProvider>
                <App />
                <Toaster />
               </ShipmentContextProvider>
             </TrackContextProvider>
           </CityContextProvider>
         </DropPointContextProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
