import React from "react";

import { Button } from "@material-ui/core";

export const PrimaryButton = ({ stylesId, handleclick, value }) => {
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
