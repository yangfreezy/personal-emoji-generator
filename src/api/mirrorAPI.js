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
  setIsGenerating,
  setUploadedImages,
  setGeneratedEmojis,
  setErrorMessage,
  uploadedImages,
  mirrorToken
) {
  let emojis = [];
  setIsGenerating(true);
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
      if (!generatedEmoji.data.face) {
        setErrorMessage(
          `Ran into some trouble generating one of your emojis. Sorry about that!`
        );
        continue;
      }
      emojis.push({
        url: generatedEmoji.data.face.url,
        id: generatedEmoji.data.face.id,
        name: image.name
      });
    } catch (err) {
      setErrorMessage(
        `Ran into some trouble generating one of your emojis. Sorry about that!`
      );
      console.error(err);
    }
  }
  setIsGenerating(false);
  setUploadedImages([]);
  setGeneratedEmojis(emojis);
}

export { getMirrorAPIToken, generateEmojis };
