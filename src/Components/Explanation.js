import React from "react";

import { Text } from ".";
import { Column } from "./../Layouts";

const Explanation = () => {
  return (
    <Column stylesClass="explanation">
      <Text stylesClass="explanation-title"> {"How it works!"} </Text>
      <Text>
        {"1. Upload any number of images with faces clearly in view."}
      </Text>
      <Text> {"2. Generate all the  emojis with one click."} </Text>
      <Text> {"3. Save them all as a zip with one click!"}</Text>
    </Column>
  );
};

export default Explanation;
