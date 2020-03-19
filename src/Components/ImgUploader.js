import React from "react";

import ImageUploader from "react-images-upload";

export const ImgUploader = ({ onchange }) => {
  return (
    <ImageUploader
      withIcon={true}
      buttonText="Upload"
      onChange={onchange}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
    />
  );
};
