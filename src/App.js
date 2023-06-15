import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import MapDisplay from "./components/MapDisplay";
import { simulateAGVData } from "./data/simulation";
import "./styles/app.css";
import store from "./store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = simulateAGVData(dispatch, store.getState);

    // Cleanup function to stop the simulation when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <div className="app flex">
      <Sidebar />
      <MapDisplay />
    </div>
  );
};

export default App;
