import React, { useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";

//Components
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

export default function AccountPage() {
  const {
    emailRef,
    fNameRef,
    lNameRef,
    countryRef,
    genderRef,
    phoneRef,
    addressRef,
  } = useRef();

  const { currentUser } = useAuth();

  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      //   signup(emailRef.current.value, passwordRef.current.value).then(
      //     (userRes) => {
      //       const signUpUser = {
      //         uid: userRes.user.uid,
      //         emailAddress: userRes.user.email,
      //         country: country.value,
      //         firstName: fNameRef.current.value,
      //         lastName: lNameRef.current.value,
      //       };
      //       return axios
      //         .post("http://localhost:7000/api/users", signUpUser)
      //         .then((response) => {
      //           history.push("/");
      //           console.log(response);
      //         })
      //         .catch((err) => {
      //           setError("Failed to add user details");
      //         });
      //     }
      //   );
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  const countries = [
    { country: "Canada", value: "CA" },
    { country: "USA", value: "USA" },
    { country: "India", value: "IN" },
  ];

  const genderOptions = [
    { gender: "Male", value: "M" },
    { gender: "Female", value: "F" },
    { gender: "Other", value: "O" },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div>
            <Typography variant="h6" gutterBottom>
              Update Profile:
            </Typography>
            <br />

            <Grid container spacing={4}>
              {error && <Alert severity="error">{error}</Alert>}
              <form
                className={classes.form}
                error={error}
                noValidate
                onSubmit={handleSubmit}
              >
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
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="text"
                      inputRef={emailRef}
                      onClick={() => emailRef.current.focus()}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Autocomplete
                      id="gender"
                      onChange={(event, value) => setGender(value)}
                      options={genderOptions}
                      getOptionLabel={(option) => option.gender}
                      required
                      renderInput={(params) => (
                        <TextField {...params} label="Gender" />
                      )}
                      ref={genderRef}
                    />
                  </Grid>

                  <Grid item xs={9}>
                    <Autocomplete
                      id="country"
                      onChange={(event, value) => setCountry(value)}
                      options={countries}
                      getOptionLabel={(option) => option.country}
                      required
                      renderInput={(params) => (
                        <TextField {...params} label="Country" />
                      )}
                      ref={countryRef}
                    />
                  </Grid>

                  <Grid item xs={9}>
                    <TextField
                      required
                      fullWidth
                      id="phnumber"
                      label="Phone Number"
                      name="phnumber"
                      type="text"
                      inputRef={phoneRef}
                      onClick={() => phoneRef.current.focus()}
                      autoComplete="phnumber"
                    />
                  </Grid>

                  <Grid item xs={9}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      type="text"
                      inputRef={addressRef}
                      onClick={() => addressRef.current.focus()}
                      autoComplete="address"
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
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </div>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
