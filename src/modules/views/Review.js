import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation Summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem} key="Hotel name">
          <ListItemText primary="Hotel Name" />
          <Typography variant="body2">
            {props.hotelInfo && props.hotelInfo.roomType}
          </Typography>

          {/* 5/5 Exceptional (2 reviews)
Guests rated this property 5/5 for cleanliness
1 Property:
Check-in: Fri, Apr 16
Check-out: Mon, Apr 19
3-night stay */}
        </ListItem>
        {/* ))} */}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}></Grid>
    </React.Fragment>
  );
}
