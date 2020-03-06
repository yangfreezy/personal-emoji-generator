import React, { useState, useEffect } from "react";

import { generateEmojis, getMirrorAPIToken } from "./api/mirrorAPI.js";
import { zipAndSaveEmojis } from "./api/zipAndSaveEmojis.js";

import { CardList, Explanation } from "./Containers";
import {
  ImgUploader,
  LoadingAnimation,
  PrimaryButton,
  Render,
  TemporaryMessage,
  Text
} from "./Components";
import { Layout, Row } from "./Layouts";

import "./styles.css";

function App() {
  const [mirrorAPIToken, setMirrorAPIToken] = useState(
    localStorage.getItem("mirrorAPIToken") || ""
  );
  const [uploadedImages, setUploadedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmojis, setGeneratedEmojis] = useState([]);

  useEffect(() => {
    if (!mirrorAPIToken) getMirrorAPIToken(setMirrorAPIToken);
  }, [mirrorAPIToken]);

  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 4000);
  }, [errorMessage]);

  return (
    <Layout stylesClass="App">
      <Text stylesClass="title" text="Make Emojis!" />
      <ImgUploader onchange={async images => setUploadedImages(images)} />
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
      <Render
        renderIf={
          generatedEmojis.length && !isGenerating && !uploadedImages.length
        }
      >
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
        <Row>
          <Explanation />
        </Row>
      </Render>
      <Render renderIf={isGenerating}>
        <Row>
          <LoadingAnimation stylesClass="loading" />
        </Row>
      </Render>
      <Render renderIf={uploadedImages.length && !isGenerating}>
        <Row>
          <CardList cards={uploadedImages} />
        </Row>
      </Render>
      <Render
        renderIf={
          generatedEmojis.length && !isGenerating && !uploadedImages.length
        }
      >
        <Row>
          <CardList cards={generatedEmojis} />
        </Row>
      </Render>
    </Layout>
  );
}

export default App;
