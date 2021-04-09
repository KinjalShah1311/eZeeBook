import withRoot from "./modules/withRoot";

import React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import HotelInfo from "./modules/views/HotelInfo";

function HotelDetailInfo() {
  return (
    <React.Fragment>
      <AppAppBar />
      <HotelInfo />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(HotelDetailInfo);
