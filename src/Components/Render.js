import React from "react";

import { Layout } from "./../Layouts";

const Render = ({ renderIf, stylesClass, children }) => {
  return renderIf ? (
    <Layout stylesClass={stylesClass}>{children} </Layout>
  ) : null;
};

export default Render;
