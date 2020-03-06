import React from "react";

const Text = ({ text, stylesClass }) => {
  return <div className={stylesClass}> {text}</div>;
};

export default Text;
