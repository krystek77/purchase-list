import React, { useContext, useEffect } from "react";
import "./App.css";
import Auth from "./containers/Auth";
import { AuthContext } from "./context/auth";

import Purchases from "./containers/Purchases";

export default function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    console.log("[App.js] - mounted");
    return () => {
      console.log("[App.js] - unmounted");
    };
  }, []);
  return (
    <div className="App">{authContext.idToken ? <Purchases /> : <Auth />}</div>
  );
}
