import React from "react";

export const Column = ({ stylesClass, children }) => {
  return (
    <div className={stylesClass ? stylesClass + " column" : "column"}>
      {children}
    </div>
  );
};
