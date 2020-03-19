import React from "react";

import { Text } from ".";

const ErrorMessage = ({ children }) => {
  return <Text className="error-message"> {children}</Text>;
};

export default ErrorMessage;
