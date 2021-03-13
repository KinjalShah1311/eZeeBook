import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//components
import themeObject from './util/theme';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme(themeObject);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <AuthProvider>
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  <Route
                    path="/signup"
                    component={Signup}
                  />
                  <Route
                    path="/login"
                    component={Login}
                  />
                  <Route
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                </Switch>
              </div>
            </AuthProvider>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
