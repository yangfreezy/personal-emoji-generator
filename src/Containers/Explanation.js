import React from "react";

import { Layout, Text } from "./../Components";

const Explanation = () => {
  return (
    <Layout stylesClass="column explanation">
      <Text stylesClass="explanation-title" text="How it works!" />
      <Text text="1. Upload any number of images of anyone with their face clearly in view." />
      <Text text="2. Generate the emojis." />
      <Text text="3. Save them all as a zip with one click!" />
    </Layout>
  );
};

export default Explanation;
