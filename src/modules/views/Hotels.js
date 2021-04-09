import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "../components/Typography";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Hotel from "./Hotel";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9),
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
      //console.log("Price: ", names[i].hotel.ratePlan.price.exactCurrent)
      hotels1.push({
        roomID: names[i].hotel.id,
        roomType: names[i].hotel.name,
        rating: names[i].hotel.guestReviews.rating,
        totalOccupancy: 10,
        totalBathrooms: 3,
        totalBedrooms: 5,
        summary:
          names[i].hotel.address.streetAddress +
          " Near " +
          names[i].hotel.neighbourhood +
          ", " +
          names[i].hotel.address.locality,
        address:
          names[i].hotel.address.streetAddress +
          ", " +
          names[i].hotel.address.locality,
        hasTV: true,
        hasKitchen: true,
        hasAirConditioner: true,
        hasInternet: true,
        price: 150,
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
        <Grid container spacing={24} justify="center" className={classes.root}>
          {hotels1.map((hotel) => (
            <Hotel {...hotel} key={hotel.roomID} room={hotel} />
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
