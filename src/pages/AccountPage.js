import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//Components
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  emailAddress: yup.string().required(),
  phoneNumber: yup.number().required(),
});

export default function AccountPage() {
  const emailRef = useRef();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const { currentUser } = useAuth();

  const [country, setCountry] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: "",
    phoneNumber: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  function updateProfile(e) {
    e.preventDefault();
    setLoading(true);
    const uid = currentUser.uid;
    return axiosInstance
      .put(`/api/users/${uid}`, userData)
      .then((response) => {
        setLoading(false);
        setOpen(true);
      })
      .catch((err) => {
        setError("Failed to update user details");
      });
  }
  function getUserData() {
    try {
      setError("");
      setLoading(true);
      const uid = currentUser.uid;

      setCountry("CA");
      return axiosInstance
        .get(`/api/users/${uid}`)
        .then((response) => {
          const userData = response.data;
          setUserData(userData);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to get user details");
        });
    } catch {
      setError("Failed to get an account");
    }
  }

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h6" gutterBottom>
            Update Profile:
          </Typography>
          <br />
          {error && <Alert severity="error">{error}</Alert>}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Profile updated successfully
            </Alert>
          </Snackbar>
          <Grid container spacing={4}>
            <form
              className={classes.form}
              error={error}
              noValidate
              onSubmit={updateProfile}
            >
              {!loading && (
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  container
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} sm={9}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      inputRef={fNameRef}
                      value={userData.firstName}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      inputRef={lNameRef}
                      value={userData.lastName}
                      autoComplete="lname"
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      required
                      fullWidth
                      id="emailAddress"
                      label="Email Address"
                      name="emailAddress"
                      type="text"
                      inputRef={emailRef}
                      onClick={() => emailRef.current.focus()}
                      value={userData.emailAddress}
                      autoComplete="emailAddress"
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      type="text"
                      inputRef={phoneRef}
                      onClick={() => phoneRef.current.focus()}
                      defaultValue={userData.phoneNumber}
                      onChange={handleChange}
                      autoComplete="phoneNumber"
                    />
                  </Grid>

                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      type="text"
                      inputRef={addressRef}
                      onClick={() => addressRef.current.focus()}
                      autoComplete="address"
                      defaultValue={userData.address}
                      onChange={handleChange}
                      multiline
                    />
                  </Grid>

                  <Grid item xs={9}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={loading}
                    >
                      Update Profile
                    </Button>
                  </Grid>
                  <Grid item xs={9}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              )}
            </form>
          </Grid>
          <br />

          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
