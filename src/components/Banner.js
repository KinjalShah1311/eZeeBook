import React, { useState } from "react";
import './Banner.css'
import { Link } from "react-router-dom";
import  { Button } from "@material-ui/core";
import Search from './Search'

export default function Banner() {
    const [showSearch, setShowSearch] =useState(false);
  return (
    <div className="banner">
        <div className='banner__search'>
            
            <Button onClick ={()=> setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>Search Dates</Button>
            {showSearch && <Search />}
        </div>


    </div>
  );
}
