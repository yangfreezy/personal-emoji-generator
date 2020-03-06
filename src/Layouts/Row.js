import React from "react";

const Row = ({ stylesClass, children }) => {
  return (
    <div className={stylesClass ? stylesClass + " row" : "row"}>{children}</div>
  );
};

export default Row;
