import withRoot from "./modules/withRoot";

import React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import Hotels from "./modules/views/Hotels";

function HotelList() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Hotels />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(HotelList);
