import React from "react";

import { Layout } from "./../Layouts";

const Loading = () => {
  return (
    <Layout stylesClass="loading">
      <Layout stylesClass="circle">
        <Layout stylesClass="circle__el"></Layout>
      </Layout>
      <Layout stylesClass="circle">
        <Layout stylesClass="circle__el circle__el_two"></Layout>
      </Layout>
      <Layout stylesClass="circle">
        <Layout stylesClass="circle__el circle__el_three"></Layout>
      </Layout>
    </Layout>
  );
};

export default Loading;
