import React from "react";

const TemporaryMessage = ({ message, stylesClass }) => {
  return <div className={stylesClass}>{message}</div>;
};

export default TemporaryMessage;
