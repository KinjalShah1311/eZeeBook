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
import Rating from '@material-ui/lab/Rating';

import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 10,
    minWidth: 300,
  },
  media: {
    width: 400,
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
  summaryBox: {
    minHeight: 80,
  },
  roomClicked: {
    display: "none",
  },
  hotelName: {
    minHeight: 60,
  },
});

export default function HotelCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (hotel, startDate, endDate) => {
    localStorage.setItem("selectedHotel", JSON.stringify(hotel));
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);

    history.push({
      pathname: "/hotel",
      hotel: hotel,
      startDate:startDate,
      endDate:endDate,
    });
  };

  return (
    <Card className={classes.root} onClick={() => handleClick(props.room, props.startDate, props.endDate)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.room.roomBanner}
          title={props.room.roomType}
        />
        <CardContent className={classes.summaryBox}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.hotelName}
          >
            {props.room.roomType}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.room.summary}
          </Typography>
          <Rating name="read-only" value={props.room.rating} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
