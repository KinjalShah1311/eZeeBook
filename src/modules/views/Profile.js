import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";
import Typography from "../components/Typography";
import AppForm from "./AppForm";
import * as Yup from "yup";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

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

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: "",
    phoneNumber: "",
    country: "",
  });

  function updateProfile(updatedValues) {
    const uid = currentUser.uid;
    return axiosInstance
      .put(`/api/users/${uid}`, updatedValues)
      .then(() => {
        setIsLoading(false);
        setMessage("Your profile is updated successfully!");
        getUserData();
      })
      .catch(() => {
        setIsLoading(false);
        setError("Failed to update user details");
      });
  }

  function getUserData() {
    try {
      setError("");
      setIsLoading(true);
      const uid = currentUser.uid;

      return axiosInstance
        .get(`/api/users/${uid}`)
        .then((response) => {
          const userData = response.data;
          setUserData(userData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError("Failed to get user details");
        });
    } catch {
      setIsLoading(false);
      setError("Failed to get an account");
    }
  }

  function cancelProfile(){
    getUserData();
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

      {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
      {message && <Alert severity="success" onClose={() => setMessage("")}>{message}</Alert>}

      {!isLoading && (
        <Formik
          initialValues={{
            firstName: userData.firstName,
            emailAddress: userData.emailAddress,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            address: userData.address,
          }}
          validationSchema={Yup.object().shape({
            emailAddress: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            firstName: Yup.string().max(255).required("First Name is required"),
            lastName: Yup.string().max(255).required("Last Name is required"),
            phoneNumber: Yup.number(),
          })}
          onSubmit={async (values) => {
            setIsLoading(true);
            try {
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
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}></Box>

              <TextField
                error={Boolean(touched.emailAddress && errors.emailAddress)}
                fullWidth
                helperText={touched.emailAddress && errors.emailAddress}
                label="Email Address"
                margin="normal"
                name="emailAddress"
                onBlur={handleBlur}
                onChange={handleChange}
                type="emailAddress"
                value={values.emailAddress}
                variant="outlined"
                disabled
              />
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
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                fullWidth
                helperText={touched.phoneNumber && errors.phoneNumber}
                label="Phone Number"
                margin="normal"
                name="phoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.phoneNumber}
                variant="outlined"
              />

              <TextField
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label="Address"
                margin="normal"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.address}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isLoading}
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
                  disabled={isLoading}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={cancelProfile}
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
