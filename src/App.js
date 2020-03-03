import React, { useState, useEffect } from "react";

import axios from "axios";
import ImageUploader from "react-images-upload";
import { Button, List, ListItem } from "@material-ui/core";

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

  useEffect(() => {}, [uploadedPictureNames]);

  useEffect(() => {
    async function getToken() {
      let token;
      try {
        const { data } = await axios("https://mirror-ai.p.rapidapi.com/token", {
          headers: {
            "x-rapidapi-host": "mirror-ai.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_MIRROR_API_KEY
          }
        });
        token = data.token;
        localStorage.setItem("pictureToken", token);
        setPictureToken(token);
        setTokenSaved(true);
        return token;
      } catch (err) {
        console.error(err);
      }
    }
    if (!pictureToken) getToken();
  }, [pictureToken, tokenSaved]);

  async function generateEmojis() {
    let emojis = [];
    setGenerating(true);
    for (var photo of uploadedPictures) {
      let form = new FormData();
      form.append("photo", photo);
      try {
        let generatedEmoji = await axios(
          "https://mirror-ai.p.rapidapi.com/generate",
          {
            method: "POST",
            headers: {
              "x-rapidapi-host": "mirror-ai.p.rapidapi.com",
              "x-rapidapi-key": process.env.REACT_APP_MIRROR_API_KEY,
              "content-type": "multipart/form-data",
              "x-token": pictureToken
            },
            data: form
          }
        );
        if (!generatedEmoji.data.ok) {
          if (generatedEmoji.data.error === "face_not_detected") {
            setErrorMessage(`Face not detected in image ${photo.name}`);
          }
        }
        emojis.push({
          url: generatedEmoji.data.face.url,
          id: generatedEmoji.data.face.id,
          name: photo.name
        });
      } catch (err) {
        console.log(err);
        console.error(err);
        alert("Error generating emojis");
      }
    }
    setGenerating(false);
    setUploadedPictures([]);
    setUploadedPictureNames([]);
    setGeneratedEmojis(
      emojis.filter(emoji => emoji.id.length && emoji.url.length)
    );
  }

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
            onClick={generateEmojis}
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
