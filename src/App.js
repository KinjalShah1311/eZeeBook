import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//components
import themeObject from "./util/theme";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import AccountPage from "./pages/AccountPage";
import Layout from "./layout/Layout";
import HotelInfo from "./components/HotelInfo";
import Hotels from './components/Hotels';
import Home from './Home';

const theme = createMuiTheme(themeObject);

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <AuthProvider>
          <Home/>
        </AuthProvider>
      </Router>
      </>
      // <MuiThemeProvider theme={theme}>
      //   <Provider store={store}>
      //     <Router>
      //       <AuthProvider>
      //         <div className="container">
      //           <Switch>
      //             <Route exact path="/" component={Dashboard} />
      //             <PrivateRoute
      //               exact
      //               path="/update-profile"
      //               component={AccountPage}
      //             />
      //             <Route path="/signup" component={Signup} />
      //             <Route path="/login" component={Login} />
      //             <Route path="/forgot-password" component={ForgotPassword} />
      //             <Route path="/hotel" component={HotelInfo} />
      //             <Route path="/secondpage" component={Hotels} />
      //           </Switch>
      //         </div>
      //       </AuthProvider>
      //     </Router>
      //   </Provider>
      // </MuiThemeProvider>
    );
  }
}

export default App;
