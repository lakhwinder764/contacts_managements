import './App.css';
import React,{useState,useEffect} from "react";
import {MenuItem,FormControl,Select,} from "@mui/material";
import axios from "axios";
import InputBox from "./Input";
import Map from "./Map"; 
import {sortData} from "./util";
import "leaflet/dist/leaflet.css";
import LineChart from "./LineChart";
import numeral from "numeral";
function App() {
   const [countries1,setcountries]=useState([]);
   const[countryinfo,setcountryinfo]=useState({});
    const [country,setcountry]=useState("worldwide");  
    const [Data,setTableData]=useState([]);
    const [mapcenter,setmapcenter]=useState({
      lat:"20",
      lng:"77"
    }); 
    const [mapcountries,setmapcountries]=useState([]);
    const [casestype,setcasestype]=useState("cases");  
    const [casesData, setcasesData] = React.useState([]);
    const [deathsData, setdeathsData] = React.useState([]);
    const [recoveredData, setRecoveredData] = React.useState([]);  
    
    useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/all")
    .then((res)=>{
      setcountryinfo(res.data);
    })
  }, [])

  useEffect(()=>{
      axios.get("https://disease.sh/v3/covid-19/countries")
      .then((res)=>{
         const countries=res.data.map((val)=>{
              return(
                {
                  name:val.country,
                  value:val.countryInfo.iso2
                }
              )
      })
     const sortedData=sortData(res.data);
      setcountries(countries);
      setmapcountries(sortedData);
      setTableData(sortedData);
    }
      )
  }
    
   ,[])

   React.useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then((response) => {
    setcasesData(Object.keys(response?.data?.cases)?.map((val, i) => ({
       "x": val,
       "y": response?.data?.cases[val],
     })));
     setdeathsData(Object.keys(response.data?.deaths)?.map((val, i) => ({
       "x": val,
       "y": response?.data?.deaths[val],
     })));
     setRecoveredData(Object.keys(response.data?.recovered)?.map((val, i) => ({
       "x": val,
       "y": response?.data?.recovered[val],
     })));
   });
   }, [])
  const onCountryChange=async(event)=>{
       const code =  event.target.value;
       const url=code==="worldwide"?"https://disease.sh/v3/covid-19/all":
       `https://disease.sh/v3/covid-19/countries/${code}`;
       axios.get(url)
       .then((res)=>{
          setcountry(code);
          setcountryinfo(res.data);
         setmapcenter([res.data.countryInfo.lat,res.data.countryInfo.long]);
      })
        }
  return (
    <div className="app">
        <div className="app_left">
           <div className="app_header">
             <h1>COVID-19 TRACKER</h1>
             <FormControl className="app_dropdown">
                 <Select
               variant="outlined"
               value={country}
               onChange={onCountryChange}
               >
         <MenuItem value="worldwide">worldwide</MenuItem>
         {
           countries1.map((val)=>{
             return(
            <MenuItem value={val.value}>{val.name}</MenuItem>
             )
           })
         }      
            </Select>
               </FormControl>
      </div>
             <div className="app_stats">
              <InputBox  onClick={e=>setcasestype("cases")} title="coronavirus cases" total={`${numeral(countryinfo.cases).format("0.0a")} Total`} cases={numeral(countryinfo.todayCases).format("0.0a")}/>
              <InputBox  onClick={e=>setcasestype("recovered")}  title="recovered cases" total={`${numeral(countryinfo.recovered).format("0.0a")} Total`}  cases={numeral(countryinfo.todayRecovered).format("0.0a")}/>
              <InputBox   onClick={e=>setcasestype("deaths")}  title="deaths" total={`${numeral(countryinfo.deaths).format("0.0a")} Total`}   cases={numeral(countryinfo.todayDeaths).format("0.0a")}/>       
       
       </div>
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
             </div>
      </div>
  );
}
export default App;