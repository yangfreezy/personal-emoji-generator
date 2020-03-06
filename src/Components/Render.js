import React, { Fragment } from "react";

const Render = ({ renderIf, children }) => {
  return renderIf ? <Fragment>{children} </Fragment> : null;
};

export default Render;
