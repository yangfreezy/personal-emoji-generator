import React, { useState, useEffect } from "react";

import { generateEmojis, getMirrorAPIToken } from "./api/mirrorAPI.js";
import { zipAndSaveEmojis } from "./api/zipAndSaveEmojis.js";

import { CardList, Explanation } from "./Containers";
import {
  ImgUploader,
  Loading,
  PrimaryButton,
  Render,
  Text
} from "./Components";
import { Layout, Row } from "./Layouts";

import "./styles.css";

function App() {
  const [mirrorAPIToken, setMirrorAPIToken] = useState(
    localStorage.getItem("mirrorAPIToken") || ""
  );

  const [uploadedImages, setUploadedImages] = useState([]);
  const [generatedEmojis, setGeneratedEmojis] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [initialAppState, setInitialAppState] = useState(true);
  const [imagesAreUploaded, setImagesAreUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emojisAreGenerated, setEmojisAreGenerated] = useState(false);

  useEffect(() => {
    if (!mirrorAPIToken) getMirrorAPIToken(setMirrorAPIToken);
  }, [mirrorAPIToken]);

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 4000);
  }, [errorMessage]);

  useEffect(() => {
    generatedEmojis.length && !isGenerating && !uploadedImages.length
      ? setEmojisAreGenerated(true)
      : setEmojisAreGenerated(false);

    uploadedImages.length && !isGenerating
      ? setImagesAreUploaded(true)
      : setImagesAreUploaded(false);

    !uploadedImages.length && !generatedEmojis.length && !isGenerating
      ? setInitialAppState(true)
      : setInitialAppState(false);
  }, [generatedEmojis, isGenerating, uploadedImages]);

  return (
    <Layout stylesClass="App">
      <Text stylesClass="title">{"Make Emojis!"} </Text>
      <ImgUploader onchange={async images => setUploadedImages(images)} />
      <Render renderIf={errorMessage}>
        <Text stylesClass="error-message">{errorMessage} </Text>
      </Render>
      <Render renderIf={imagesAreUploaded}>
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
      <Render renderIf={emojisAreGenerated}>
        <PrimaryButton
          stylesId="button-save"
          handleclick={() => zipAndSaveEmojis(generatedEmojis, setErrorMessage)}
          value="Save As Zip"
        />
      </Render>
      <Render renderIf={initialAppState}>
        <Row>
          <Explanation />
        </Row>
      </Render>
      <Render renderIf={isGenerating}>
        <Row>
          <Loading />
        </Row>
      </Render>
      <Render renderIf={imagesAreUploaded}>
        <Row>
          <CardList cards={uploadedImages} />
        </Row>
      </Render>
      <Render renderIf={emojisAreGenerated}>
        <Row>
          <CardList cards={generatedEmojis} />
        </Row>
      </Render>
    </Layout>
  );
}

export default App;
