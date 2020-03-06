import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";

import { generateEmojis, getMirrorAPIToken } from "./api/mirrorAPI.js";
import { zipAndSaveEmojis } from "./api/zipAndSaveEmojis.js";

import { CardList } from "./Containers";
import {
  Layout,
  LoadingAnimation,
  PrimaryButton,
  TemporaryMessage,
  Text
} from "./Components";

import "./styles.css";

function App() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mirrorAPIToken, setMirrorAPIToken] = useState(
    localStorage.getItem("mirrorAPIToken") || ""
  );
  const [generatedEmojis, setGeneratedEmojis] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async images => {
    setUploadedImages(images);
  };

  useEffect(() => {
    if (!mirrorAPIToken) getMirrorAPIToken(setMirrorAPIToken);
  }, [mirrorAPIToken]);

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 8000);
  }, [errorMessage]);

  return (
    <Layout stylesClass="App">
      <Text stylesClass="title" text="Make An Emoji!" />
      <ImageUploader
        withIcon={true}
        buttonText="Start"
        onChange={handleUpload}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <TemporaryMessage
        shouldLoadIf={errorMessage.length}
        stylesClass="error-message"
        message={errorMessage}
      />
      <PrimaryButton
        shouldLoadIf={uploadedImages.length && !generating}
        stylesId="button-generate"
        value="Generate"
        handleclick={() =>
          generateEmojis(
            setGenerating,
            setUploadedImages,
            setGeneratedEmojis,
            setErrorMessage,
            uploadedImages,
            mirrorAPIToken
          )
        }
      />
      <PrimaryButton
        shouldLoadIf={generatedEmojis.length}
        stylesId="button-save"
        handleclick={() => zipAndSaveEmojis(generatedEmojis, setErrorMessage)}
        value={"Save As Zip"}
      />
      <Layout stylesClass="row">
        <LoadingAnimation stylesClass="loading" shouldLoadIf={generating} />
      </Layout>
      <Layout stylesClass="row">
        <CardList
          shouldLoadIf={uploadedImages.length && !generating}
          cards={uploadedImages}
        />
        <CardList
          shouldLoadIf={generatedEmojis.length}
          cards={generatedEmojis}
        />
      </Layout>
    </Layout>
  );
}

export default App;
