import React from "react";

import Layout from "./Layout";

const Render = ({ renderIf, stylesClass, children }) => {
  return renderIf ? <Layout stylesClass={stylesClass}>children </Layout> : null;
};

export default Render;
