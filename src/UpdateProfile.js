import withRoot from "./modules/withRoot";

import React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import Profile from "./modules/views/Profile";

function UpdateProfile() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Profile />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(UpdateProfile);
