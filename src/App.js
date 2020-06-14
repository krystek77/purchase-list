import React from "react";
import "./App.css";
import Auth from "./containers/Auth";

import Purchases from "./containers/Purchases";

export default function App() {
  return (
    <div className="App">
      <Auth />
      {/* <Purchases /> */}
    </div>
  );
}
