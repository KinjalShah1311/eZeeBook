import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


export default function SubmitHotelReview() {

  const classes = useStyles();
  const location = useLocation();
  const handleTextFieldChange = (e) => {
    setTextInput(e.target.value)
  };

  const [value, setValue] = React.useState(2.5);
  const [textInput, setTextInput] = React.useState("");

  const hotel = location.state.hotel;
  const handleClick = () => {
    console.log(textInput,value)
    pushReviewData();
  }
  function pushReviewData() {
    const reviewData = {
      rating: value,
      comments: textInput
    }
    return axios
      .post(`http://localhost:7000/api/rooms/${hotel.roomID}/reviews`, reviewData)
      .then(function (response) {
        console.log(response);
      })
  }

  return (
    <React.Fragment>
      <Box
        component="span"
        borderColor="transparent"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Rating
          mb={3}
          name="customized-empty"
          value={value}
          label="Select Star Rating"
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onClick={(event, newValue) => {
          }}
          size="large"
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 10,
          }}
        />
      </Box>
      <Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Describe your stay"
            multiline
            rows={4}
            mt={3}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleTextFieldChange}
          />
        </Grid>
      </Grid>
      
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick = {handleClick}
      >
        Submit Review
      </Button>
    </React.Fragment>
  );
}
