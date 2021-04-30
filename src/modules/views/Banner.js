import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { useTheme } from "@material-ui/core/styles";

import Button from "../components/Button";
import Typography from "../components/Typography";
import BannerLayout from "./BannerLayout";
import HotelSearch from "../components/HotelSearch";

const backgroundImage =
  "https://cdn.pixabay.com/photo/2017/12/16/22/22/bora-bora-3023437_960_720.jpg";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: "200px",
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function Banner(props) {
  const { classes } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BannerLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        className={classes.markedH2Center}
      >
        Book your stay
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Vacation rentals, Hotel booking -30% off the best luxury hotels.
      </Typography>
      <Button
        color="secondary"
        // backgroundColor=""
        variant="contained"
        size="large"
        className={classes.button}
        // component="a"
        onClick={() => handleClickOpen()}
      >
        Search Hotels
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}
      >
        <DialogTitle id="form-dialog-title">
          Search hotel by location, Date, No. of days to stay etc..
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <HotelSearch />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* </Link> */}
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </BannerLayout>
  );
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Banner);
