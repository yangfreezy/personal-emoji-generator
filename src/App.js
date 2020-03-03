import React, { useState, useEffect } from "react";

import ImageUploader from "react-images-upload";
import { Button, List, ListItem } from "@material-ui/core";

import { generateEmojis, getMirrorAPIToken } from "./api/mirrorAPI.js";

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
      <div className="title"> Emoji Generator </div>
      <ImageUploader
        withIcon={true}
        buttonText="Upload"
        onChange={handleUpload}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <List>
        {uploadedImages.length
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
      {generating ? (
        <div className="loading">
          {uploadedImages.length > 1
            ? "Generating your emojis..."
            : "Generating your emoji..."}
        </div>
      ) : null}
      {errorMessage.length ? (
        <div className="error-message">{errorMessage}</div>
      ) : null}
      {generatedEmojis.length
        ? generatedEmojis.map(emoji => (
            <div className="emoji-card">
              <div className="emoji-name"> {emoji.name}</div>
              <img className="emoji-image" src={emoji.url} alt={emoji.id} />
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
