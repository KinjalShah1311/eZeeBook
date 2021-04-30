import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import Typography from "../components/Typography";
import AppForm from "./AppForm";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";

// Auth
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9),
  },
  button: {
    border: "4px solid currentColor",
    borderRadius: 0,
    height: "auto",
    padding: theme.spacing(2, 5),
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width: 60,
  },
});

function Profile(props) {
  const { classes } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const [country, setCountry] = useState("");

  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: "",
    phoneNumber: "",
    country: "",
  });

  function updateProfile() {
    const uid = currentUser.uid;
    return axiosInstance
      .put(`/api/users/${uid}`, userData)
      .then(() => {
        setLoading(false);
        setOpen(true);
      })
      .catch(() => {
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
        .catch(() => {
          setError("Failed to get user details");
        });
    } catch {
      setError("Failed to get an account");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AppForm>
      <React.Fragment>
        <Typography variant="h3" marked="center" align="center">
          Update Your Profile
        </Typography>
      </React.Fragment>
      {!loading && (
        <Formik
          initialValues={{
            firstName: userData.firstName,
            email: userData.emailAddress,
            lastName: userData.lastName
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
          })}
          onSubmit={async (values) => {
            setIsLoading(true);
            try {
              /*const newUser = await Auth.signUp({
                    username: values.email,
                    password: values.password,
                  });*/
              setError("");
              updateProfile(values);
              setIsLoading(false);
            } catch (e) {
              setIsLoading(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}></Box>

              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First Name"
                margin="normal"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.firstName}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Last Name"
                margin="normal"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.lastName}
                variant="outlined"
              />
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
                  Update Profile
                </Button>
              </Box>
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </AppForm>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
