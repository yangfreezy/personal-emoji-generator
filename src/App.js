import React, { useState, useEffect } from "react";

import ImageUploader from "react-images-upload";
import { Button, List, ListItem } from "@material-ui/core";

import { generateEmojis, getToken } from "./api/mirror-ai.js";

import "./styles.css";

function App() {
  const [uploadedPictures, setUploadedPictures] = useState([]);
  const [uploadedPictureNames, setUploadedPictureNames] = useState([]);
  const [pictureToken, setPictureToken] = useState(
    localStorage.getItem("pictureToken") || ""
  );
  const [tokenSaved, setTokenSaved] = useState(
    pictureToken.length ? true : false
  );
  const [generatedEmojis, setGeneratedEmojis] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async pictures => {
    setUploadedPictures(pictures);
    setUploadedPictureNames(pictures.map(picture => picture.name));
  };

  useEffect(() => {
    if (!pictureToken) getToken(setPictureToken, setTokenSaved);
  }, [pictureToken, tokenSaved]);

  return (
    <div className="App">
      <div className="title"> Personal Emoji Generator </div>
      <ImageUploader
        withIcon={true}
        buttonText="Upload"
        onChange={handleUpload}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <List>
        {uploadedPictureNames.length
          ? uploadedPictureNames.map(name => {
              return (
                <ListItem button className="list-item" key={name}>
                  {name}
                </ListItem>
              );
            })
          : null}
      </List>
      {tokenSaved && uploadedPictures.length && !generating ? (
        <div className="button-generate">
          <Button
            id="button-generate"
            onClick={() =>
              generateEmojis(
                setGenerating,
                setUploadedPictures,
                setUploadedPictureNames,
                setGeneratedEmojis,
                setErrorMessage,
                uploadedPictures,
                pictureToken
              )
            }
            variant="contained"
            color="primary"
          >
            {uploadedPictures.length > 1 ? "Generate Emojis" : "Generate Emoji"}
          </Button>
        </div>
      ) : null}
      {generating ? (
        <div className="loading">
          {uploadedPictures.length > 1
            ? "Generating your emojis.."
            : "Generating your emoji.."}
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
