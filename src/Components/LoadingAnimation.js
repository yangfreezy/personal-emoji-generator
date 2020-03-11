import React from "react";

import { Layout } from "./../Layouts";

const LoadingAnimation = ({ stylesClass }) => {
  return (
    <Layout stylesClass="loading">
      <Layout stylesClass="circle">
        <span className="circle__el"></span>
      </Layout>
      <Layout stylesClass="circle">
        <span className="circle__el circle__el_two"></span>
      </Layout>
      <Layout stylesClass="circle">
        <span className="circle__el circle__el_three"></span>
      </Layout>
    </Layout>
  );
};

export default LoadingAnimation;
