import React from "react";

const Column = ({ stylesClass, children }) => {
  return (
    <div className={stylesClass ? stylesClass + " column" : "column"}>
      {children}
    </div>
  );
};

export default Column;
