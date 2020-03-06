import React from "react";

const TemporaryMessage = ({ shouldLoadIf, message, stylesClass }) => {
  return shouldLoadIf ? <div className={stylesClass}>{message}</div> : null;
};

export default TemporaryMessage;
