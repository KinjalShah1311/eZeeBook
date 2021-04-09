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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from "axios";

//Components
import Footer from "./Footer";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const cofirmpasswordRef = useRef();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const countryRef = useRef();
  const [country, SetCountry] = useState('');

  const history = useHistory();

  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== cofirmpasswordRef.current.value) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value)
        .then((userRes) => {
          const signUpUser = {
            uid: userRes.user.uid,
            emailAddress: userRes.user.email,
            country: country.value,
            firstName: fNameRef.current.value,
            lastName: lNameRef.current.value,
          };
          return axios
            .post("http://localhost:7000/api/users", signUpUser)
            .then((response) => {
              history.push("/");
              console.log(response);
            })
            .catch((err) => {
              setError("Failed to add user details");
            });
        })
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{<LockOutlinedIcon />}</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} error={error}  noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                inputRef={fNameRef}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                inputRef={lNameRef}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cofirmpassword"
                label="Confirm Password"
                type="password"
                id="cofirmpassword"
                autoComplete="current-password"
                inputRef={cofirmpasswordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="country"
                onChange={(event, value) => SetCountry(value)} 
                options={countries}
                getOptionLabel={(option) => option.country}
                required
                renderInput={(params) => (
                  <TextField {...params} label="Country" variant="outlined" />
                )}
                ref={countryRef}
              />
            </Grid>
          </Grid>
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
  );
}
