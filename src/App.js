import React, { useContext } from "react";
import "./App.css";
import Auth from "./containers/Auth";
import { AuthContext } from "./context/auth";

import Purchases from "./containers/Purchases";

export default function App() {
  const authContext = useContext(AuthContext);

  return (
    <div className="App">{authContext.idToken ? <Purchases /> : <Auth />}</div>
  );
}
