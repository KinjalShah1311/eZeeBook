import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Review booking", "Customer Information", "Payment details"];

function getStepContent(step, hotelInfo) {
  switch (step) {
    case 0:
      return <Review hotelInfo={hotelInfo} />;
    case 1:
      return <AddressForm />;
    case 2:
      return <PaymentForm hotelInfo={hotelInfo}/>;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout(props) {
  const { currentUser } = useAuth();
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleHomePage = () => {
    history.push({
      pathname: "/",
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const hotel = location.hotel;
  const startDate= location.startDate;
  const endDate= location.endDate;
  console.log("nameeeee" +hotel +"dateeee "+startDate +"end"+endDate);
  function pushReservationData() {
    
    const uid = currentUser.uid;
    const reserveData = {
      startDate: startDate,
      endDate: endDate,
      price: hotel.price,
      total: hotel.price,
      bookingDate: new Date(),
    }
    return axios
      .post(`http://localhost:7000/api/reservations/${uid}/rooms/${hotel.roomID}/reservations`, reserveData)
      .then(function (response) {
        console.log(response);
      })
  }


  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Reservation
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your booking number is #2001539. We have emailed your booking
                confirmation, and will send you an update when your room is
                ready.
                {pushReservationData()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleHomePage}
                className={classes.button}
              >
                Go Back to HomePage
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, location.hotel)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? ("Reserve Hotel") : "Next"}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </React.Fragment>
  );
}
