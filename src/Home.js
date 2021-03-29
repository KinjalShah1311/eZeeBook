import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Categories from "./modules/views/Categories";
import ContactUs from "./modules/views/ContactUs";
import AppFooter from "./modules/views/AppFooter";
import Banner from "./modules/views/Banner";
import Values from "./modules/views/Values";
import Newsletter from "./modules/views/Newsletter";
import AppAppBar from "./modules/views/AppAppBar";
import Login from "./components/Login";
import SignUp from "./components/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
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
