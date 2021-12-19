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
import Table from "./components/Table";

const App = () => {
  const [myState, setMyState] = useState("India");
  const [allStates, setAllStates] = useState([]);
  const [mapStates, setMapStates] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [infoBox, setInfoBox] = useState({});

  useEffect(() => {
    const getStatesData = async () => {
      fetch("https://www.mohfw.gov.in/data/datanew.json")
        .then((response) => response.json())
        .then((data) => {
          const states = data.map((st) => ({
            name: st.state_name,
            value: st.state_code,
          }));
          setAllStates(states);
          setMapStates(data);
          setTableData(data);
        });
    };

    getStatesData();
  }, []);

  const onStateChange = (e) => {
    setMyState(e.target.value);

    const individualData = tableData.find((element) => {
      return element.state_code === e.target.value;
    });
    setInfoBox(individualData);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={myState} onChange={onStateChange}>
              <MenuItem value="India">India</MenuItem>
              {allStates.map((st) => (
                <MenuItem value={st.value}>{st.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={infoBox.new_active}
            total={infoBox.new_positive}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={infoBox.cured}
            total={infoBox.new_cured}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={infoBox.death}
            total={infoBox.new_death}
          />
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by States</h3>
            <Table states={tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
