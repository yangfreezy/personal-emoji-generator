import React from "react";

import Layout from "./Layout";

const LoadingAnimation = ({ shouldLoadIf, stylesClass }) => {
  return shouldLoadIf ? (
    <Layout stylesClass="loading">
      <div className="circle">
        <span className="circle__el"></span>
      </div>
      <div className="circle">
        <span className="circle__el circle__el_two"></span>
      </div>
      <div className="circle">
        <span className="circle__el circle__el_three"></span>
      </div>
    </Layout>
  ) : null;
};

export default LoadingAnimation;
