import React, { useState } from "react";
import './Banner.css';
import { Link } from "react-router-dom";
import  { Button } from "@material-ui/core";
import Search from './Search'
import Hotels from './Hotels'
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import DataService from '../api/DataService'

import SearchIcon from "@material-ui/icons/Search";

export default function Banner() {
    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
        root: {
          display: "flex",
        },
    }))
    const classes = useStyles();
    const [showSearch, setShowSearch] =useState(false);
    const [cityName, setCityName] = useState("new york");
    const handleChange=(event)=>
  {
    if (event.target.value!=null) 
      setCityName(event.target.value);
  }
  
  function getList(){
    DataService.retrieveLocation(cityName).then(function (response) {
      console.log(response.data);
      var lat=response.data.suggestions[0].entities[0].latitude;
      var lon=response.data.suggestions[0].entities[0].longitude;
      DataService.retriveHotelNames(lat,lon).then(function (response) {
      const hotels=response.data.data.body.searchResults.results;
      console.log(hotels);
      var hotelNames=[];
      for (var i =0;i <hotels.length ;i++){
        
        hotelNames.push({name: hotels[i].name,img1:hotels[i].optimizedThumbUrls.srpDesktop});
      }
      console.log(hotelNames);
      history.push({
        pathname: '/secondpage',
        state: { name: hotelNames }
    });
    }
   
    )
    }).catch(function (error) {
      console.error(error);
    });
  }
  return (
    <div className="banner">
        <div className='banner__search'>
        {/* <div className={classes.search}> */}
            <div>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
            //   classes={{
            //     root: classes.inputRoot,
            //     input: classes.inputInput,
            //   }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}

            />
            <button onClick={getList}>GET</button>
          {/* </div> */}
            <Button onClick ={()=> setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>Search Dates</Button>
            {showSearch && <Search />}
        </div>

        {/* <Hotels hotelNames={hotelNames}/> */}
    </div>
  );
}
