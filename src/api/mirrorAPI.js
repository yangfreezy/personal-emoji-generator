import axios from "axios";

async function getMirrorAPIToken(setMirrorAPIToken) {
  let token;
  try {
    const { data } = await axios("https://mirror-ai.p.rapidapi.com/token", {
      headers: {
        "x-rapidapi-host": "mirror-ai.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_MIRROR_API_KEY
      }
    });
    token = data.token;
    localStorage.setItem("mirrorAPIToken", token);
    setMirrorAPIToken(token);
    return token;
  } catch (err) {
    console.error(err);
  }
}

async function generateEmojis(
  setGenerating,
  setUploadedImages,
  setGeneratedEmojis,
  setErrorMessage,
  uploadedImages,
  mirrorToken
) {
  let emojis = [];
  setGenerating(true);
  for (var image of uploadedImages) {
    let form = new FormData();
    form.append("photo", image);
    try {
      let generatedEmoji = await axios(
        "https://mirror-ai.p.rapidapi.com/generate",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "mirror-ai.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_MIRROR_API_KEY,
            "content-type": "multipart/form-data",
            "x-token": mirrorToken
          },
          data: form
        }
      );
      if (!generatedEmoji.data.ok) {
        if (generatedEmoji.data.error === "face_not_detected") {
          setErrorMessage(`Face not detected in image ${image.name}`);
        } else {
          setErrorMessage(
            `Ran into some trouble generating your emoji. Sorry about that!`
          );
        }
      }
      emojis.push({
        url: generatedEmoji.data.face.url,
        id: generatedEmoji.data.face.id,
        name: image.name
      });
    } catch (err) {
      console.error(err);
    }
  }
  setGenerating(false);
  setUploadedImages([]);
  setGeneratedEmojis(
    emojis.filter(
      emoji => emoji.id.length && emoji.url.length && emoji.name.length
    )
  );
}

export { getMirrorAPIToken, generateEmojis };
