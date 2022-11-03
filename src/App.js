import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExerciseDescription from "./Screens/ExerciseDescription";
import ExerciseRegime from "./Screens/ExerciseRegime";
import { RealTime } from "./Screens/RealTime";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route exact path="/" element={<ExerciseRegime />} />
        <Route exact path="/exercise" element={<ExerciseDescription />} />
        <Route exact path="/realtime" element={<RealTime />} />
      </Routes>
    </Router>
  );
}

export default App;
