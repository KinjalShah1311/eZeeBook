import React, {useState} from 'react'
import "react-date-range/dist/theme/default.css"
import "react-date-range/dist/styles.css"
import {DateRangePicker} from "react-date-range";
import './Search.css' 
import  { Button } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People"

export default function Search(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange ={
        startdate: startDate,
        endDate : endDate,
        key: "selection",
    }
    function handleSelect(ranges){
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);

    }

    return (
        <div className="search">
            <DateRangePicker ranges={
                [selectionRange]} onChange={handleSelect} />
                <h2>Number of guests
                    <PeopleIcon />
                </h2>
                <input min={0}
                defaultValue={2}
                type="number" />
                <Button>Search
                     </Button>

        </div>
    )
}
