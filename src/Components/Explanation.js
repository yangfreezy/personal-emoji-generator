import React from "react";

import { Column } from "./../Layouts";

export const Explanation = () => {
  return (
    <Column stylesClass="explanation">
      <div className="explanation-title"> {"How it works!"} </div>
      <div>{"1. Upload any number of images with faces clearly in view."}</div>
      <div> {"2. Generate all the  emojis with one click."} </div>
      <div> {"3. Save them all as a zip with one click!"}</div>
    </Column>
  );
};
