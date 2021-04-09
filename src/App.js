import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { Component } from "react";

//components
import themeObject from "./util/theme";
//todo
import Dashboard from "./components/Dashboard";
import HotelInfo from "./components/HotelInfo";
import Hotels from "./components/Hotels";
import Checkout from "./components/Checkout";
import Home from "./Home";

const theme = createMuiTheme(themeObject);

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <AuthProvider>
            <Home />
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
      //             <Route path="/checkout" component={Checkout} />
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
