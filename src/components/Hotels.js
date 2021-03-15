import React from "react";
import Hotel from "./Hotel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {

    },
});

const hotels1 = [
    {
        roomID: 1,
        roomType: "House",
        rating: 4.5,
        totalOccupancy: 10,
        totalBathrooms: 3,
        totalBedrooms: 5,
        summary: "This house has a great view",
        address: "Address 1",
        hasTV: true,
        hasKitchen: true,
        hasAirConditioner: true,
        hasInternet: true,
        price: 500,
        longitude: -80.512658,
        latitude: 43.413714,
        roomBanner: "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_960_720.jpg"
    },
    {
        roomID: 2,
        roomType: "Home",
        rating: 0,
        totalOccupancy: 11,
        totalBathrooms: 2,
        totalBedrooms: 5,
        summary: "This house has a great view",
        address: "Address 2",
        hasTV: true,
        hasKitchen: true,
        hasAirConditioner: true,
        hasInternet: true,
        price: 500,
        longitude: -80.512658,
        latitude: 43.413714,
        roomBanner: "https://cdn.pixabay.com/photo/2015/10/20/18/57/furniture-998265__340.jpg"
    },
    {
        roomID: 2,
        roomType: "Home",
        rating: 0,
        totalOccupancy: 11,
        totalBathrooms: 2,
        totalBedrooms: 5,
        summary: "This house has a great view",
        address: "Address 2",
        hasTV: true,
        hasKitchen: true,
        hasAirConditioner: true,
        hasInternet: true,
        price: 500,
        longitude: -80.512658,
        latitude: 43.413714,
        roomBanner: "https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521__340.jpg"
    },
    {
        roomID: 2,
        roomType: "Home",
        rating: 0,
        totalOccupancy: 11,
        totalBathrooms: 2,
        totalBedrooms: 5,
        summary: "This house has a great view",
        address: "Address 2",
        hasTV: true,
        hasKitchen: true,
        hasAirConditioner: true,
        hasInternet: true,
        price: 500,
        longitude: -80.512658,
        latitude: 43.413714,
        roomBanner: "https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_960_720.jpg"
    }
]

const Hotels = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={24} justify="center" className={classes.root}>
            {hotels1.map((hotel) => (
                <Hotel {...hotel} key={hotel.roomID} room={hotel.roomID} />
            ))}
        </Grid>
    );
};

export default Hotels;
