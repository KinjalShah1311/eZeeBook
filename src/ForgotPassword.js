import withRoot from "./modules/withRoot";
import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";

import { Box, Button, TextField, makeStyles } from "@material-ui/core";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";

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

function ForgotPassword() {
  const classes = useStyles();
  const { resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              "send you a link to reset your password."}
          </Typography>
        </React.Fragment>

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
          })}
          onSubmit={(values) => {
            try {
              const userData = {
                email: values.email,
              };
              setMessage("");
              setError("");
              setLoading(true);
              resetPassword(userData.email).then(() => {
                // isSubmitting(false);
                setMessage("Check your inbox for further instruction");
              });
              //
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleSubmit,
            handleChange,
            isSubmitting,
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
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  SEND RESET Link
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Don&apos;t have an account?{" "}
                <Link to={"signup"} variant="h6">
                  Sign up
                </Link>
              </Typography>
              <Typography color="textSecondary" variant="body1">
                <Link to={"signin"} variant="h6">
                  Log In
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </AppForm>

      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);
