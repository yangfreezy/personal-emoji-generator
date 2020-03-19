import React from "react";

export const Row = ({ stylesClass, children }) => {
  return (
    <div className={stylesClass ? stylesClass + " row" : "row"}>{children}</div>
  );
};
