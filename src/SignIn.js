import withRoot from "./modules/withRoot";

import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, TextField, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import * as Yup from "yup";
import { Formik } from "formik";

// Auth
import { useAuth } from "./contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn() {
  const { login } = useAuth();
  const history = useHistory();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
        </React.Fragment>
        {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
        {message && <Alert severity="success" onClose={() => setMessage("")}>{message}</Alert>}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={(values) => {
            try {
              const userData = {
                email: values.email,
                password: values.password,
              };
              setError("");
              setLoading(true);
              login(userData.email, userData.password)
                .then((x) => {
                  history.push("/");
                })
                .catch((ex) => {
                  setError("Incorrect Email or Password. Please try again!");
                  setLoading(false);
                });
            } catch (e) {
              setError(e.message);
              setLoading(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleSubmit,
            handleChange,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Don&apos;t have an account?{" "}
                <Link to={"signup"} variant="h6">
                  Sign up
                </Link>
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Forgot Password?{" "}
                <Link to={"forgot-password"} variant="h6">
                  Click here
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
