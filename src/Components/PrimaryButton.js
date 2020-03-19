import React from "react";

import { Button } from "@material-ui/core";

export const PrimaryButton = ({ handleclick, stylesId, value }) => {
  return (
    <Button
      id={stylesId}
      variant="contained"
      color="primary"
      onClick={handleclick}
    >
      {value}
    </Button>
  );
};
