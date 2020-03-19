import React, { useState, useEffect, Fragment } from "react";

import { generateEmojis, getAndSetMirrorAPIToken } from "./api/mirrorAPI.js";
import { zipAndSaveEmojis } from "./api/zipAndSaveEmojis.js";

import {
  CardList,
  ErrorMessage,
  Explanation,
  ImgUploader,
  Loading,
  PrimaryButton,
  Title
} from "./Components";
import { Row } from "./Layouts";

import "./styles.css";

function App() {
  const [mirrorAPIToken, setMirrorAPIToken] = useState(
    localStorage.getItem("mirrorAPIToken") || ""
  );
  useEffect(() => {
    if (!mirrorAPIToken) getAndSetMirrorAPIToken(setMirrorAPIToken);
  }, [mirrorAPIToken]);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [emojis, setEmojis] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setTimeout(() => setErrorMessage(""), 4000);
  }, [errorMessage]);

  // Booleans for conditional rendering of components
  const [landingState, setLandingState] = useState(true);
  const [imagesUploadedState, setImagesUploadedState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [emojisGeneratedState, setEmojisGeneratedState] = useState(false);

  // Sets conditional rendering booleans based on application state
  useEffect(() => {
    !uploadedImages.length && !emojis.length && !loadingState
      ? setLandingState(true)
      : setLandingState(false);
    uploadedImages.length && !loadingState
      ? setImagesUploadedState(true)
      : setImagesUploadedState(false);
    emojis.length && !loadingState && !uploadedImages.length
      ? setEmojisGeneratedState(true)
      : setEmojisGeneratedState(false);
  }, [emojis, loadingState, uploadedImages]);

  return (
    <div className="App">
      <Title>{"Make Emojis!"} </Title>
      <ImgUploader onchange={async images => setUploadedImages(images)} />
      {landingState && (
        <Row>
          <Explanation />
        </Row>
      )}
      {errorMessage && <ErrorMessage>{errorMessage} </ErrorMessage>}
      {imagesUploadedState && (
        <Fragment>
          <PrimaryButton
            stylesId="button-generate"
            value="Generate"
            handleclick={() =>
              generateEmojis(
                mirrorAPIToken,
                uploadedImages,
                setLoadingState,
                setEmojis,
                setUploadedImages,
                setErrorMessage
              )
            }
          />
          <Row>
            <CardList cards={uploadedImages} />
          </Row>
        </Fragment>
      )}
      {loadingState && (
        <Row>
          <Loading />
        </Row>
      )}
      {emojisGeneratedState && (
        <Fragment>
          <PrimaryButton
            stylesId="button-save"
            handleclick={() => zipAndSaveEmojis(emojis, setErrorMessage)}
            value="Save As Zip"
          />
          <Row>
            <CardList cards={emojis} />
          </Row>
        </Fragment>
      )}
    </div>
  );
}

export default App;
