import React, { useState, useEffect } from "react";

import ImageUploader from "react-images-upload";
import { Button, Card } from "@material-ui/core";

import { generateEmojis, getMirrorAPIToken } from "./api/mirrorAPI.js";

import { Text, TemporaryMessage, Layout } from "./Components";

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

  return (
    <Layout className="App">
      <Text className="title" value="Emoji Generator" />
      <ImageUploader
        withIcon={true}
        buttonText="Upload"
        onChange={handleUpload}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      {generating ? (
        <TemporaryMessage className="loading">
          {uploadedImages.length > 1
            ? "Generating your emojis..."
            : "Generating your emoji..."}
        </TemporaryMessage>
      ) : null}
      {errorMessage.length ? (
        <TemporaryMessage className="error-message">
          {errorMessage}
        </TemporaryMessage>
      ) : null}
      {uploadedImages.length && !generating ? (
        <Button
          id="button-generate"
          onClick={() =>
            generateEmojis(
              setGenerating,
              setUploadedImages,
              setGeneratedEmojis,
              setErrorMessage,
              uploadedImages,
              mirrorAPIToken
            )
          }
          variant="contained"
          color="primary"
        >
          {uploadedImages.length > 1 ? "Generate Emojis" : "Generate Emoji"}
        </Button>
      ) : null}
      <Layout className="row">
        {uploadedImages.length && !generating
          ? uploadedImages.map(image => {
              return (
                <Card className="card" key={image.name}>
                  <Layout className="card-layout">
                    <Text className="card-name" value={image.name} />
                    <img
                      className="card-image"
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                    />
                  </Layout>
                </Card>
              );
            })
          : null}
      </Layout>
      <Layout className="row">
        {generatedEmojis.length
          ? generatedEmojis.map(emoji => (
              <Card className="card" key={emoji.name}>
                <Layout className="card-layout">
                  <Text className="card-name" value={emoji.name} />
                  <img className="card-image" src={emoji.url} alt={emoji.id} />
                </Layout>
              </Card>
            ))
          : null}
      </Layout>
    </Layout>
  );
}

export default App;
