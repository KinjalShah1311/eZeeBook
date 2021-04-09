import withRoot from "./modules/withRoot";

import React from "react";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AddReview from "./modules/views/AddReview";

function ReviewInfo() {
  return (
    <React.Fragment>
      <AppAppBar />
      <AddReview />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ReviewInfo);
