import React, { useState } from "react";
import Hotel from "./Hotel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import HotelInfo from './HotelInfo'
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
    root: {

    },
});

var hotels1;
function assignValues(names) {

    hotels1 = [];
    if (names.length > 0) {
        for (var i = 0; i < names.length; i++) {
            //console.log("Price: ", names[i].hotel.ratePlan.price.exactCurrent)
            hotels1.push({
                roomID: names[i].hotel.id,
                roomType: names[i].hotel.name,
                rating: names[i].hotel.guestReviews.rating,
                totalOccupancy: 10,
                totalBathrooms: 3,
                totalBedrooms: 5,
                summary: names[i].hotel.address.streetAddress + " Near " + names[i].hotel.neighbourhood + ", " + names[i].hotel.address.locality,
                address: names[i].hotel.address.streetAddress + ", " + names[i].hotel.address.locality,
                hasTV: true,
                hasKitchen: true,
                hasAirConditioner: true,
                hasInternet: true,
                price: 150,
                longitude: -80.512658,
                latitude: 43.413714,
                roomBanner: names[i].hotel.optimizedThumbUrls.srpDesktop
            });
        }
    }

}
function Hotels() {
    const location = useLocation();
    const classes = useStyles();
    //console.log(location.state.name);
    assignValues(location.state.name);

    return (
        <div>

            <Grid container spacing={24} justify="center" className={classes.root}>
                {hotels1.map((hotel) => (
                    <Hotel {...hotel} key={hotel.roomID} room={hotel} />
                ))
                }
            </Grid>
        </div>
    );
};

export default Hotels;
