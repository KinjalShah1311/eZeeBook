import React, { useState } from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./ListItems";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import logo from "./../logo.svg";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
import DataService from '../api/DataService';

//context
import { useAuth, logout } from "../contexts/AuthContext";

//components

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
  accountCircle: {
    height: 25,
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Header() {

  const [cityName, setCityName] = useState("new york");
  const handleChange = (event) => {
    if (event.target.value != null)
      setCityName(event.target.value);
  }
  function getList() {
    DataService.retrieveLocation(cityName).then(function (response) {
      console.log(response.data);
      var lat = response.data.suggestions[0].entities[0].latitude;
      var lon = response.data.suggestions[0].entities[0].longitude;
      DataService.retriveHotelNames(lat, lon).then(function (response) {
        const hotels = response.data.data.body.searchResults.results;
        console.log(hotels);
        var hotelNames = [];
        for (var i = 0; i < hotels.length; i++) {
          hotelNames.push(hotels[i].name);
        }
        console.log(hotelNames);
      })
    }).catch(function (error) {
      console.error(error);
    });
  }

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logClicked = (id) => {
    if (id == "login") {
      history.push("/login");
    }
    if (id == "signup") {
      history.push("/signup");
    }
  };

  const handleLogoClick = () => {
    history.push("/");
  }

  const handleLogout = async () => {
    setError("");
    history.push("/login");
    try {
      await logout();
    } catch {
      setError("Failed to logout");
    }
  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item>
              <IconButton edge="start" noWrap="true"
                color="inherit" onClick={handleLogoClick}>
                <img src={logo} alt="ezeebook logo" className={classes.logo} />
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                >
                  eZeeBook
                </Typography>
              </IconButton>
            </Grid>
            <Grid item>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleChange}

                />
                <button onClick={getList}>GET</button>
              </div>
            </Grid>
          </Grid>
          <IconButton color="inherit">
            <Badge color="secondary">
              <div>
                <AccountCircleSharpIcon onClick={handleClick} className={classes.accountCircle} />
                {/* <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <ListSubheader key="username">{`${currentUser.email}`}</ListSubheader>
                  <MenuItem onClick={handleClose}>
                    <Link to="/update-profile">Update Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My bookings</MenuItem>
                  <MenuItem onClick={() => logClicked("login")}>
                    {" "}
                    LogIn{" "}
                  </MenuItem>
                  <MenuItem onClick={() => logClicked("signup")}>
                    {" "}
                    SignUp{" "}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu> */}
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>
                    <ListItemIcon>
                      <AccountBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/update-profile">
                      <ListItemText primary="Update Profile"></ListItemText>
                    </Link>
                  </StyledMenuItem>
                  <StyledMenuItem onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </>
  );
}
