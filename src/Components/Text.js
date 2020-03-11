import React from "react";

const Text = ({ children, stylesClass }) => {
  return <div className={stylesClass}> {children}</div>;
};

export default Text;
