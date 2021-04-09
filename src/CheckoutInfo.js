import withRoot from "./modules/withRoot";

import React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import Checkout from "./modules/views/Checkout";

function CheckoutDetailInfo() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Checkout />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(CheckoutDetailInfo);
