import React from "react";

import { Text } from "./../Components";
import { Column } from "./../Layouts";

const Explanation = () => {
  return (
    <Column stylesClass="explanation">
      <Text stylesClass="explanation-title" text="How it works!" />
      <Text text="1. Upload any number of images with faces clearly in view." />
      <Text text="2. Generate all the  emojis with one click." />
      <Text text="3. Save them all as a zip with one click!" />
    </Column>
  );
};

export default Explanation;
