import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useLocation, useHistory } from "react-router-dom";

//components
import SingleHotel from "./SingleHotel";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "600px",
    //display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    maxWidth: 40,
    marginRight: "10px",
  },
}));

export default function HotelInfo(props) {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  let hotel = null;
  let startDate = null;
  let endDate = null;

  if (localStorage.getItem("selectedHotel") != null) {
    hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  } else if (location["hotel"]) hotel = location.hotel;

  if (localStorage.getItem("startDate") != null) {
    startDate = localStorage.getItem("startDate");
  } else if (location["startDate"]) startDate = location.startDate;

  if (localStorage.getItem("endDate") != null) {
    endDate = localStorage.getItem("endDate");
  } else if (location["endDate"]) endDate = location.endDate;

  const handleHomePage = () => {
    history.push({
      pathname: "/",
    });
  };

  return (
    <Container className={classes.root} component="section" justify="center">
      {hotel && startDate && endDate ? (
        <SingleHotel key={hotel.roomID}  room={hotel} startDate={startDate} endDate={endDate} />
      ) : (
        <>
          <div>
            <h2>Something went wrong, Please search again!</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleHomePage}
              className={classes.button}
            >
              Go Back to HomePage
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
