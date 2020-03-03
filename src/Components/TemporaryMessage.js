import React from "react";

const TemporaryMessage = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default TemporaryMessage;
