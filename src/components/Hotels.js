import React from "react";
import Hotel from "./Hotel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
    root: {

    },
});

var hotels1;
function assignValues(names){
    
     hotels1=[];
if (names.length>0){
    for (var i=0;i<names.length;i++){
        hotels1.push({
            roomID: 1,
            roomType: names[i].name,
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
            roomBanner: names[i].img1
        }); 
    }
}

}
function Hotels  ()  {
    const location = useLocation();
    const classes = useStyles();
    console.log(location.state.name);
   assignValues(location.state.name);

    return (
        <div> 
            
        <Grid container spacing={24} justify="center" className={classes.root}>
            {hotels1.map((hotel) => (
                <Hotel {...hotel} key={hotel.roomID} room={hotel.roomID} />
                
            ))}
        </Grid>
        </div>
    );
};

export default Hotels;
