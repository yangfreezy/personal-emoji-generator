import React from "react";

const Layout = ({ stylesClass, children }) => {
  return <div className={stylesClass}>{children}</div>;
};

export default Layout;
