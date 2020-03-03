import React, { useState, useEffect } from "react";

import ImageUploader from "react-images-upload";
import { Button, List, ListItem } from "@material-ui/core";

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
    <div className="App">
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
      <List>
        {uploadedImages.length && !generating
          ? uploadedImages.map(image => {
              return (
                <ListItem button className="list-item" key={image}>
                  {image.name}
                </ListItem>
              );
            })
          : null}
      </List>
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
      {generatedEmojis.length
        ? generatedEmojis.map(emoji => (
            <Layout className="emoji-card">
              <Text className="emoji-name" value={emoji.name} />
              <img className="emoji-image" src={emoji.url} alt={emoji.id} />
            </Layout>
          ))
        : null}
    </div>
  );
}

export default App;
