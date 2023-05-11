import { useState } from "react";
import "./App.scss";
import { Nav } from "./components/Nav/Nav";
import { Calendar } from "./components/Calendar/Calendar";

function App() {
  return (
    <div className="app">
      <Nav />
      <Calendar />
    </div>
  );
}

export default App;
