import React from "react";
import Navbar from "./components/Navbar";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <GameBoard />
    </div>
  );
}

export default App;