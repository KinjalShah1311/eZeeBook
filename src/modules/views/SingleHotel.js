import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import Grid from "@material-ui/core/Grid";
import WifiIcon from "@material-ui/icons/Wifi";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import TvIcon from "@material-ui/icons/Tv";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import DataService from "../../api/DataService";
import ListReviews from "./ListReviews";
import axiosInstance from "../../api/axiosInstance";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    padding: "5px",
  },
  media: {
    minWidth: "600px",
    height: "350px",
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
  reviews: {
    margin: "10px 15px 0px 15px",
    padding: "5px",
    borderTop: "1px solid lightgrey",
  },
  amenitiesItem: {
    margin: "5px 15px",
  },

  icons: {
    color: "#0292B7",
    height: 18,
    margin: "0 2px",
  },
  button: {
    margin: "10px 15px",
  },
});

export default function SingleHotel(props) {

  const { currentUser } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [imageBanner, setImageBanner] = useState("");
  const [userReview, setUserReview] = useState([]);

  const [dbReviews, setDbReviews] = useState([]);
  const [apiReviews, setApiReviews] = useState([]);

  function review() {
    history.push({
      pathname: "/review",
      state: { hotel: props.room },
    });
  }

  async function getBothReviews() {
    let data = [];
    await axiosInstance
      .get(`/api/rooms/${props.room.roomID}/reviews`)
      .then((res) => {
        data = Object.values(res.data);

        //database
        setDbReviews(data);

        // DataService.retrieveReviews(props.room.roomID)
        //   .then((apiResponse) => {
        //     let responseArray =
        //       apiResponse.data.reviewData.guestReviewGroups.guestReviews[0]
        //         .reviews;
        //     const array = responseArray.slice(
        //       responseArray.length - 10,
        //       responseArray.length
        //     );
        //     setApiReviews(array);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setDbReviews(data);
        //   });

      })
      .catch((err) => {
        setDbReviews([]);
        console.log(err);
      });
  }
  useEffect(() => {
    async function getImages() {
      let response = await DataService.retrieveImages(props.room.roomID);
      return response.data.hotelImages[0].baseUrl;
    }

    const image = getImages().then((image) => {
      return image;
    });
    getBothReviews();
    // const userReviews = getReviews().then((usrReviews) => {
    //   return usrReviews;
    // });
    image.then((image) => {
      var res = image.replace("{size}", "z");
      setImageBanner(res);
    }).catch(err => console.log(err));
  }, [props.room.roomID]);

  useEffect(() => {
    if (dbReviews.length > 0 || apiReviews.length > 0) {
      const reviewArray = [...dbReviews, ...apiReviews];
      // desc by date
      const allReview = reviewArray
        .slice(0, reviewArray.length)
        .sort((a, b) => b.postedOn - a.postedOn);
      setUserReview(allReview);
    }
  }, [dbReviews, apiReviews]);

  function reservation() {
    console.log("roooom" + props.room.name);
    if (currentUser != null) {
      history.push({
        pathname: "/checkout",
        state: {
          hotel: props.room,
          startDate: props.startDate,
          endDate: props.endDate,
        },
      });
    }
    else {
      history.push({
        pathname: "/signin",
      });
    }
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.room.roomType}
          className={classes.media}
          image={imageBanner}
          title={props.room.roomType}
        />
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h4" component="h2">
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
              <Typography variant="h6" component="h4" m={0}>
                ${props.room.price}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" component="h4">
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

        <Grid container>
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography variant="h6" component="h4">
              <WifiIcon className={classes.icons} /> Wifi
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography variant="h6" component="h4">
              <LocalDiningIcon className={classes.icons} /> Kitchen
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography variant="h6" component="h4">
              <TvIcon className={classes.icons} /> TV
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.amenitiesItem}>
            <Typography variant="h6" component="h4">
              <AcUnitIcon className={classes.icons} /> Air Conditioner
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" component="h4" className={classes.reviews}>
          Reviews
        </Typography>
        {userReview.map((userRvw) => (
          <>
            <ListReviews {...userRvw} />
          </>
        ))}
      </CardActionArea>
      <Box></Box>
      <Button
        onClick={review}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Add Review
      </Button>
      <Button
        onClick={reservation}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Reserve
      </Button>
    </Card>
  );
}
