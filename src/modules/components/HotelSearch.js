import React, { useState } from "react";
import "./css/HotelSearch.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
// import Hotels from './Hotels'
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import DataService from "../../api/DataService";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import RoomIcon from "@material-ui/icons/Room";

import SearchIcon from "@material-ui/icons/Search";

export default function HotelSearch() {
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
  }));
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const [cityName, setCityName] = useState("new york");
  const handleChange = (event) => {
    if (event.target.value != null) setCityName(event.target.value);
  };

  return (
    <div className="banner">
      <div className="banner__search">
        <div>
          <SearchIcon />
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
        </Button>
        {showSearch && <Search city={cityName} />}
      </div>
    </div>
  );
}

function Search(props) {
  const cityName = props.city;
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rooms, setNumberOfRoooms] = useState(1);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  function handleRoom(event) {
    setNumberOfRoooms(event.target.value);
  }

  function getList() {
    DataService.retrieveLocation(cityName)
      .then(function (response) {
        console.log(response.data);
        var lat = response.data.suggestions[0].entities[0].latitude;
        var lon = response.data.suggestions[0].entities[0].longitude;
        DataService.retriveHotelNames(lat, lon, startDate, endDate, rooms).then(
          function (response) {
            const hotels = response.data.data.body.searchResults.results;
            console.log(hotels);
            var hotelNames = [];
            for (var i = 0; i < hotels.length; i++) {
              hotelNames.push({ hotel: hotels[i] });
            }
            console.log(hotelNames);
            history.push({
              pathname: "/hotels-list",
              state: { name: hotelNames },
            });
          }
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="search">
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <h2>
        Number of Rooms <RoomIcon />
      </h2>
      <input min={0} defaultValue={1} type="number" onChange={handleRoom} />
      <Button onClick={getList}>Search</Button>
    </div>
  );
}
