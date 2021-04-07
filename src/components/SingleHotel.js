import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import Grid from "@material-ui/core/Grid";
import WifiIcon from "@material-ui/icons/Wifi";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import TvIcon from "@material-ui/icons/Tv";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { Button } from "@material-ui/core";
import {  useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    margin: "10px",
    padding: "5px",
  },
  media: {
    minHeight: 300,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  summaryBox: {},
  roomClicked: {
    display: "none",
  },
  rating: {
    color: "red",
    height: 15,
  },
  amenities: {
    margin: "0 15px",
    padding: "5px",
    borderTop: "1px solid lightgrey",
  },
  amenitiesItem: {
    margin: "0 15px",
  },
  icons: {
    color: "#0292B7",
    height: 18,
    margin: "0 2px",
  },
});

export default function SingleHotel(props) {
  const classes = useStyles();
  console.log("ROOMID=", props.room.roomID)
  const history = useHistory();
  function reservation(){
    history.push({
      pathname: '/checkout',
      state: { hotel: props.room }
    });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.room.roomBanner}
          title={props.room.roomType}
        />
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography gutterBottom variant="h4" component="h2">
                {props.room.roomType}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.summaryBox}
                >
                  Bedrooms: {props.room.totalBedrooms} | Bathrooms:{" "}
                  {props.room.totalBathrooms} | Occupancy:{" "}
                  {props.room.totalOccupancy}
                </Typography>
              </Typography>
            </Grid>
            <Grid item className={classes.amenitiesItem}>
              <Typography gutterBottom variant="h6" component="h4">
                ${props.room.price}
              </Typography>
            </Grid>
          </Grid>

          <Typography gutterBottom variant="h6" component="h4">
            <StarIcon className={classes.rating} />
            {props.room.rating}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.summaryBox}
          >
            {props.room.summary}
          </Typography>
        </CardContent>
        <Typography variant="h5" component="h4" className={classes.amenities}>
          Amenities
        </Typography>

        <Grid container justify="center ">
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography gutterBottom variant="h6" component="h4">
              <WifiIcon className={classes.icons} /> Wifi
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography gutterBottom variant="h6" component="h4">
              <LocalDiningIcon className={classes.icons} /> Kitchen
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography gutterBottom variant="h6" component="h4">
              <TvIcon className={classes.icons} /> TV
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography gutterBottom variant="h6" component="h4">
              <AcUnitIcon className={classes.icons} /> Air Conditioner
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
      <Box></Box>
      <Button onClick={reservation}>Reserve</Button>
    </Card>
    
  );
}
