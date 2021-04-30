import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import { useAuth } from "../../contexts/AuthContext";

const styles = (theme) => ({
  title: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});
// ToDo: Check here if already logged in or not
function AppAppBar(props) {
  const { classes } = props;
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  //console.log("currentUser:", currentUser);

  const handleLogout = async () => {
    // setError("");
    history.push("/signin");
    try {
      await logout();
    } catch {
      // setError("Failed to logout");
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link to={"/"}>
            <Typography
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
            >
              {"eZeeBook"}
            </Typography>
          </Link>
          {currentUser && currentUser.email ? (
            <>
              <div className={classes.right}>
                <Link to={"/update-profile"}>
                  <Typography
                    color="inherit"
                    variant="h6"
                    underline="none"
                    className={classes.rightLink}
                  >
                    {"Update Profile"}
                  </Typography>
                </Link>
                <Typography
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                >
                  <LogoutIcon fontSize="small" onClick={() => handleLogout()} />
                </Typography>
              </div>
            </>
          ) : (
            <>
              <div className={classes.right}>
                <Link to={"/signin"}>
                  <Typography
                    color="inherit"
                    variant="h6"
                    underline="none"
                    className={classes.rightLink}
                  >
                    {"Sign In"}
                  </Typography>
                </Link>
                <Link to={"/signup"}>
                  <Typography
                    variant="h6"
                    underline="none"
                    className={clsx(classes.rightLink)}
                  >
                    {"Sign Up"}
                  </Typography>
                </Link>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
