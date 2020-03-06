import React from "react";

import { Layout, Text } from "./../Components";

const Explanation = () => {
  return (
    <Layout stylesClass="column explanation">
      <Text stylesClass="explanation-title" text="How it works!" />
      <Text
        stylesClass="explanation-body"
        text="1. Upload any number of images of anyone with their face clearly in view."
      />
      <Text stylesClass="explanation-body" text="2. Generate the emojis." />
      <Text
        stylesClass="explanation-body"
        text="3. Save them all as a zip with one click!"
      />
    </Layout>
  );
};

export default Explanation;
