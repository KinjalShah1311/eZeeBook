import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";


function UpdateProfile() {
  return (
    <React.Fragment>
      <AppAppBar />
      
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(UpdateProfile);
