import React from "react";

import { Button } from "@material-ui/core";

const PrimaryButton = ({ shouldLoadIf, handleclick, stylesId, value }) => {
  return shouldLoadIf ? (
    <Button
      id={stylesId}
      variant="contained"
      color="primary"
      onClick={handleclick}
    >
      {value}
    </Button>
  ) : null;
};

export default PrimaryButton;
