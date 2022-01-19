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
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [globalData, setGlobalData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("Worldwide");
  const [isSelected, setIsSelected] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [infoBox, setInfoBox] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 23.512, lng: 80.329 });
  const [mapZoom, setMapZoom] = useState(4.5);

  useEffect(() => {
    const getStatesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            id: country.countryInfo.iso3,
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setAllCountries(countries);
          setMapCountries(data);
          setTableData(data);
        });
    };

    getStatesData();
  }, []);

  useEffect(() => {
    const fetchGlobalData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setGlobalData(data);
        });
    };

    fetchGlobalData();
  }, []);

  const onCountryChange = (e) => {
    if (e.target.value === "Worldwide") {
      setIsSelected(false);
      setMapCenter({ lat: 23.512, lng: 80.329 });
    } else {
      setSelectedCountry(e.target.value);
      const individualData = tableData.find((element) => {
        return element.country === e.target.value;
      });
      setInfoBox(individualData);
      setMapCenter({
        lat: individualData.countryInfo.lat,
        lng: individualData.countryInfo.long,
      });
      setMapZoom(4);
      setIsSelected(true);
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={selectedCountry}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {allCountries.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
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
            cases={isSelected ? infoBox.todayCases : globalData.todayCases}
            total={isSelected ? infoBox.cases : globalData.cases}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={
              isSelected ? infoBox.todayRecovered : globalData.todayRecovered
            }
            total={isSelected ? infoBox.recovered : globalData.recovered}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={isSelected ? infoBox.todayDeaths : globalData.todayDeaths}
            total={isSelected ? infoBox.deaths : globalData.deaths}
          />
        </div>
        <Map
          country={isSelected ? infoBox : globalData}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Countries</h3>
            <Table countries={tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
