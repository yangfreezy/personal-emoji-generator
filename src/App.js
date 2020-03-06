import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";

import { generateEmojis, getMirrorAPIToken } from "./api/mirrorAPI.js";
import { zipAndSaveEmojis } from "./api/zipAndSaveEmojis.js";

import { CardList, Explanation } from "./Containers";
import {
  Layout,
  LoadingAnimation,
  PrimaryButton,
  Render,
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async images => {
    setUploadedImages(images);
  };

  useEffect(() => {
    if (!mirrorAPIToken) getMirrorAPIToken(setMirrorAPIToken);
  }, [mirrorAPIToken]);

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 4000);
  }, [errorMessage]);

  return (
    <Layout stylesClass="App">
      <Text stylesClass="title" text="Make An Emoji!" />
      <ImageUploader
        withIcon={true}
        buttonText="Upload"
        onChange={handleUpload}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <Render renderIf={errorMessage.length}>
        <TemporaryMessage stylesClass="error-message" message={errorMessage} />
      </Render>
      <Render renderIf={uploadedImages.length && !isGenerating}>
        <PrimaryButton
          stylesId="button-generate"
          value="Generate"
          handleclick={() =>
            generateEmojis(
              setIsGenerating,
              setUploadedImages,
              setGeneratedEmojis,
              setErrorMessage,
              uploadedImages,
              mirrorAPIToken
            )
          }
        />
      </Render>
      <Render renderIf={generatedEmojis.length}>
        <PrimaryButton
          stylesId="button-save"
          handleclick={() => zipAndSaveEmojis(generatedEmojis, setErrorMessage)}
          value="Save As Zip"
        />
      </Render>
      <Render
        renderIf={
          !uploadedImages.length && !generatedEmojis.length && !isGenerating
        }
      >
        <Layout stylesClass="row">
          <Explanation />
        </Layout>
      </Render>
      <Render renderIf={isGenerating}>
        <Layout stylesClass="row">
          <LoadingAnimation stylesClass="loading" />
        </Layout>
      </Render>
      <Render renderIf={uploadedImages.length && !isGenerating}>
        <Layout stylesClass="row">
          <CardList cards={uploadedImages} />
        </Layout>
      </Render>
      <Render renderIf={generatedEmojis.length && !isGenerating}>
        <Layout stylesClass="row">
          <CardList cards={generatedEmojis} />
        </Layout>
      </Render>
    </Layout>
  );
}

export default App;
