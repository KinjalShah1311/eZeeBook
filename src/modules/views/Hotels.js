import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Hotel from "./HotelCardRoom";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  hotels: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  button: {
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
    padding: theme.spacing(2, 5),
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width: 60,
  },
});

var hotels1;
function assignValues(names) {
  hotels1 = [];
  if (names.length > 0) {
    for (var i = 0; i < names.length; i++) {
      // console.log("Pricesa: ", names[i].hotel?.ratePlan)
      hotels1.push({
        roomID: names[i].hotel.id,
        roomType: names[i].hotel.name,
        rating: names[i].hotel.guestReviews?.rating ? names[i].hotel.guestReviews.rating : 0,
        totalOccupancy: 10,
        totalBathrooms: 3,
        totalBedrooms: 5,
        summary:
          (names[i].hotel.address.streetAddress ? names[i].hotel.address.streetAddress : "") +
          " Near " +
          (names[i].hotel.neighbourhood ? names[i].hotel.neighbourhood : "") +
          ", " +
          (names[i].hotel.address.locality ? names[i].hotel.address.locality : ""),
        address:
          names[i].hotel.address.streetAddress +
          ", " +
          names[i].hotel.address.locality,
        hasTV: true,
        hasKitchen: true,
        hasAirConditioner: true,
        hasInternet: true,
        price: names[i].hotel.ratePlan ? names[i].hotel.ratePlan.price.exactCurrent : 34,
        longitude: -80.512658,
        latitude: 43.413714,
        roomBanner: names[i].hotel.optimizedThumbUrls.srpDesktop,
      });
    }
  }
}

function Hotels(props) {
  const { classes } = props;
  const location = useLocation();
  assignValues(location.state.name);
  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" component="span">
        Available Hotels
      </Typography>
      <div>
        <Grid container spacing={5} justify="center" className={classes.hotels}>
          {hotels1.map((hotel) => (
            <Hotel {...hotel} key={hotel.roomID} room={hotel} startDate={location.state.startDate} endDate={location.state.endDate} />
          ))}
        </Grid>
      </div>
    </Container>
  );
}

Hotels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hotels);
