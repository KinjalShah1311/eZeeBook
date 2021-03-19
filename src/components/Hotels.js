import React, { useState } from "react";
import Hotel from "./Hotel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import HotelInfo from './HotelInfo'

const useStyles = makeStyles({
    root: {

    },
});


const Hotels = (props) => {
    const classes = useStyles();

    const allHotels = props.hotels;
    return (
        <Grid container spacing={24} justify="center" className={classes.root}>
            { allHotels.map((hotel) => (
                <Hotel {...hotel} key={hotel.roomID} room={hotel.roomID} />
            ))
            }
        </Grid>
    );
};

export default Hotels;
