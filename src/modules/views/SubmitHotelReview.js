import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

export default function SubmitHotelReview() {
  const handleInputChange = () => {};

  const [value, setValue] = React.useState(2.5);
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
          onClick={() => handleInputChange()}
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
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
