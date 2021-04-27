import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AddressForm(props) {

  const classes = useStyles();
  const checkInput = (value) => {
    if (value === "") {
      setError(true);
    }

    if (firstName !== "" && lastName !== "" && email !== "" && address !== "" && city !== "" && state !== "" && zipcode !== "" && country !== "") {
      setError(false);
    }
  }


  const [error, setError] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [country, setCountry] = useState("");


  useEffect(() => {
    props.isError(error);
  }, [props, error]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={firstName}
            fullWidth
            autoComplete="given-name"
            onBlur={(e) => checkInput(e.target.value)}
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={lastName}
            onBlur={(e) => checkInput(e.target.value)}
            onChange={e => setLastName(e.target.value)}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={email}
            onBlur={(e) => checkInput(e.target.value)}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoComplete="shipping email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={address}
            onBlur={(e) => checkInput(e.target.value)}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            onBlur={(e) => checkInput(e.target.value)}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            autoComplete="city"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region"
            value={state}
            onBlur={(e) => checkInput(e.target.value)}
            onChange={(e) => setState(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={zipcode}
            onBlur={(e) => checkInput(e.target.value)}
            onChange={(e) => setZipCode(e.target.value)}
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={country}
            onBlur={(e) => checkInput(e.target.value)}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
          {error && <div className={classes.alert}>
            <Alert severity="error">Please fill out the form</Alert>
          </div>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}