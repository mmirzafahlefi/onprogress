import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./component/List";
import "./App.css";
function App() {
  return (
    <div className="container mt-5 {`App ${theme}`}">
      <List />
    </div>
  );
}
export default App;
