import withRoot from "./modules/withRoot";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Categories from "./modules/views/Categories";
import ContactUs from "./modules/views/ContactUs";
import AppFooter from "./modules/views/AppFooter";
import Banner from "./modules/views/Banner";
import Values from "./modules/views/Values";
import Newsletter from "./modules/views/Newsletter";
import AppAppBar from "./modules/views/AppAppBar";

import PrivateRoute from "./modules/PrivateRoute";

// Pages
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UpdateProfile from "./UpdateProfile";
import HotelList from "./HotelList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/secondpage">
          <HotelList />
        </Route>
        <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
      </Switch>
    </Router>
  );
}

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Banner />
      <Values />
      <Categories />
      <Newsletter />
      <ContactUs />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(App);
