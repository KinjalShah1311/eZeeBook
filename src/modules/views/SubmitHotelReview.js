import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import axiosInstance from "../../api/axiosInstance";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    minWidth: "400px",
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const DialogTitle = withStyles(useStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.dialog}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SubmitHotelReview() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    pushReviewData();
  };

  const handleTextFieldChange = (e) => {
    setTextInput(e.target.value);
  };

  const [value, setValue] = React.useState(2.5);
  const [textInput, setTextInput] = React.useState("");
  const [error, setError] = React.useState("");

  const hotel = location.state.hotel;

  const handleClick = () => {
    if (textInput === "") {
      setError('Comments are required.');
    }
    else {
      setError("");
      setOpen(true);
    }
  };

  function pushReviewData() {
    let badge = "";
    if (value === 5) {
      badge = "Exceptional";
    } else if (value >= 4 && value < 5) {
      badge = "Very Good";
    } else if (value >= 3 && value < 4) {
      badge = "Good";
    } else if (value >= 2 && value < 3) {
      badge = "Fair";
    } else {
      badge = "Poor";
    }
    const reviewData = {
      rating: value,
      summary: textInput,
      qualitativeBadgeText: badge,
    };
    return axiosInstance
      .post(
        `/api/rooms/${hotel.roomID}/reviews`,
        reviewData
      )
      .then(function (response) {
        history.push({
          pathname: "/hotel",
          hotel: hotel.room,
          startDate: hotel.startDate,
          endDate: hotel.endDate,
        });
      });
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
          onClick={(event, newValue) => { }}
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
          {error !== "" && <div className={classes.alert}>
            <Alert severity="error">{error}</Alert>
          </div>}
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        Submit Review
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          className={classes.dialog}
          onClose={handleClose}
        >
          Submit Review
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Comments: {textInput}</Typography>
          <Typography gutterBottom>Rating: {value}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            autoFocus
            onClick={handleClose}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
