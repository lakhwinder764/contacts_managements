import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Grid, Box } from '@mui/material';
import numeral from 'numeral';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import '../App.css';
import InputBox from './Input';
import Map from './Map';
import { sortData } from '../util';
import LineChart from './LineChart';

function App() {
  const [countries1, setcountries] = useState([]);
  const [countryinfo, setcountryinfo] = useState({});
  const [country, setcountry] = useState('worldwide');
  const [mapcenter, setmapcenter] = useState({
    lat: '20',
    lng: '77',
  });
  const [mapcountries, setmapcountries] = useState([]);
  const [casestype, setcasestype] = useState('cases');
  const [casesData, setcasesData] = React.useState([]);
  const [deathsData, setdeathsData] = React.useState([]);
  const [recoveredData, setRecoveredData] = React.useState([]);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all').then((res) => {
      setcountryinfo(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries').then((res) => {
      const countries = res.data.map((val) => {
        return {
          name: val.country,
          value: val.countryInfo.iso2,
        };
      });
      const sortedData = sortData(res.data);
      setcountries(countries);
      setmapcountries(sortedData);
    });
  }, []);

  React.useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then((response) => {
        setcasesData(
          Object.keys(response?.data?.cases)?.map((val, i) => ({
            x: val,
            y: response?.data?.cases[val],
          }))
        );
        setdeathsData(
          Object.keys(response.data?.deaths)?.map((val, i) => ({
            x: val,
            y: response?.data?.deaths[val],
          }))
        );
        setRecoveredData(
          Object.keys(response.data?.recovered)?.map((val, i) => ({
            x: val,
            y: response?.data?.recovered[val],
          }))
        );
      });
  }, []);
  const onCountryChange = async (event) => {
    const code = event.target.value;
    const url =
      code === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${code}`;
    axios.get(url).then((res) => {
      setcountry(code);
      setcountryinfo(res.data);
      setmapcenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
    });
  };
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <p class="font-bold text-xl">COVID-19 TRACKER</p>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries1.map((val) => {
                return <MenuItem value={val.value}>{val.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <Grid container xs={12}>
          <InputBox
            onClick={() => setcasestype('cases')}
            title="coronavirus cases"
            total={`${numeral(countryinfo.cases).format('0.0a')} Total`}
            cases={numeral(countryinfo.todayCases).format('0.0a')}
            className="infobox_cases"
          />
          <InputBox
            onClick={() => setcasestype('recovered')}
            title="recovered cases"
            total={`${numeral(countryinfo.recovered).format('0.0a')} Total`}
            cases={numeral(countryinfo.todayRecovered).format('0.0a')}
            className="infobox_recovered"
          />
          <InputBox
            onClick={() => setcasestype('deaths')}
            title="deaths"
            total={`${numeral(countryinfo.deaths).format('0.0a')} Total`}
            cases={numeral(countryinfo.todayDeaths).format('0.0a')}
            className="infobox_deaths"
          />
        </Grid>
        <Box display="flex" flexDirection="column">
          <Map
            casestype={casestype}
            countries={mapcountries}
            mapcenter={mapcenter}
          />
          <LineChart
            casesData={casesData}
            recoveredData={recoveredData}
            deathsData={deathsData}
          />
        </Box>
      </div>
    </div>
  );
}
export default App;
