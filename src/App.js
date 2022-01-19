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
  const [selectedCountry, setSelectedCountry] = useState("Worldwide");
  const [allCountries, setAllCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [infoBox, setInfoBox] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 23.512, lng: 80.329 });
  const [mapZoom, setMapZoom] = useState(4.5);

  useEffect(() => {
    const getStatesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
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

  const onCountryChange = (e) => {
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
            cases={infoBox.todayCases}
            total={infoBox.cases}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={infoBox.todayRecovered}
            total={infoBox.recovered}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={infoBox.todayDeaths}
            total={infoBox.deaths}
          />
        </div>
        <Map casesType={casesType} center={mapCenter} zoom={mapZoom} />
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
