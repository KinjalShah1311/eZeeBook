import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoomIcon from "@material-ui/icons/Room";
import SearchIcon from "@material-ui/icons/Search";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import "./css/HotelSearch.css";
import DataService from "../../api/DataService";

export default function HotelSearch() {
  const [showSearch, setShowSearch] = useState(false);
  const [cityName, setCityName] = useState(null);
 
  const handleChange = (event) => {
    if (event.target.value != null) {
      setCityName(event.target.value);
    }
  };
  const [responseFailed, setResponseFailed] = useState(false);

  function setResponse(res) {
    setResponseFailed(res);
  }
  return (
    <div className="banner">
      <div className="banner__search">
        <div>
          <SearchIcon />
          {responseFailed && (
            <div className="err">Invalid location, try searching again</div>
          )}
        </div>
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
        <Button
          onClick={() => setShowSearch(!showSearch)}
          className="banner__searchButton"
          variant="outlined"
        >
          {showSearch ? "Hide" : "Search Dates"}
          {<Search city={cityName} response={setResponse} />}
        </Button>
      </div>
    </div>
  );
}

function Search(props) {
  const history = useHistory();

  const selectedCity = props.city;
  const localStorageCity = localStorage.getItem("selectedCity");
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rooms, setNumberOfRoooms] = useState(1);
  const [loading, setLoading] = useState(false);
  const [latlon, setLatLon] = useState({ lat: null, lon: null });

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

    localStorage.setItem("startDate", ranges.selection.startDate);
    localStorage.setItem("endDate", ranges.selection.endDate);
  }

  function handleRoom(event) {
    setNumberOfRoooms(event.target.value);

    localStorage.setItem("rooms", event.target.value);
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function getLocation() {
    if(selectedCity === localStorageCity) {
      var hotelNames = JSON.parse(localStorage.getItem('hotelList'));
      history.push({
        pathname: "/hotels-list",
        state: {
          name: hotelNames,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      });
      return;
    }
    if (selectedCity != null && selectedCity != undefined) {
      setLoading(true);
      
      DataService.retrieveLocation(selectedCity)
        .then(function (response) {
          console.log(response.data);
          if (response.data.suggestions[0].entities[0] == null) {
            props.response(true);
            console.log("Incorrect data");
          }
          var lat = response.data.suggestions[0].entities[0].latitude;
          var lon = response.data.suggestions[0].entities[0].longitude;

          setLatLon({
            lat: lat,
            lon: lon,
          });
        })
        .catch(function (error) {
          console.error("Error while geting a location", error);
          setLoading(false);
        });
    } else{
      alert("No City found");
    }
  }

  function getHotelList(lat, lon) {
    setLoading(true);

    // ToDo: Cache response here based on following params
    DataService.retriveHotelNames(lat, lon, startDate, endDate, rooms).then(
      function (response) {
        const hotels = response.data.data.body.searchResults.results;
        console.log(hotels);
        var hotelNames = [];
        for (var i = 0; i < hotels.length; i++) {
          hotelNames.push({ hotel: hotels[i] });
        }
        console.log(hotelNames);
        localStorage.setItem("selectedCity", props.city);
        localStorage.setItem("hotelList", JSON.stringify(hotelNames));

        history.push({
          pathname: "/hotels-list",
          state: {
            name: hotelNames,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        });
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    if (latlon.lat != null && latlon.lon != null) {
      localStorage.setItem("lat", latlon.lat);
      localStorage.setItem("lon", latlon.lon);

      getHotelList(latlon.lat, latlon.lon);
    }
  }, [latlon]);

  return (
    <div className="search">
      {/* {responseFailed && <div>Invalid search, try again</div> } */}
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <h2>
        Number of Rooms <RoomIcon />
      </h2>
      <input
        min={0}
        defaultValue={1}
        type="number"
        min="1"
        onChange={handleRoom}
      />
      <Button onClick={getLocation} disabled = {selectedCity == null || selectedCity == undefined}>Search</Button>
      {loading && <CircularProgress size={68} color="primary" />}
    </div>
  );
}
