import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox";

const App = () => {
  const [state, setState] = useState("India");
  const [allStates, setAllStates] = useState([]);
  const [mapStates, setMapStates] = useState([]);

  useEffect(() => {
    const getStatesData = async () => {
      fetch("https://www.mohfw.gov.in/data/datanew.json")
        .then((response) => response.json())
        .then((data) => {
          const states = data.map((st) => ({
            name: st.state_name,
            value: st.state_name,
          }));
          setAllStates(states);
          setMapStates(data);
        });
    };

    getStatesData();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined">
              <MenuItem value="india">India</MenuItem>
              {allStates.map((st) => (
                <MenuItem value={st.value}>{st.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

      </div>
    </div>
  );
};

export default App;
