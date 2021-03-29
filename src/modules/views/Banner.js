import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import BannerLayout from './BannerLayout';
import { Link } from "react-router-dom";

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function Banner(props) {
  const { classes } = props;

  return (
    <BannerLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Book your stay
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Vacation rentals, Hotel booking -30% off the best luxury hotels.
      </Typography>
      <Link to={"/signup"}>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
      >
        Register
      </Button>
      </Link>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </BannerLayout>
  );
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Banner);