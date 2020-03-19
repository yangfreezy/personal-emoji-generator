import axios from "axios";

/**
 * Gets and sets a mirror api token
 * @param {Function} setMirrorAPIToken Sets Mirror API token in state
 * @returns  Mirror API Token
 **/

export const getAndSetMirrorAPIToken = async setMirrorAPIToken => {
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
};

/**
 * Converts an image file name to png
 * @param {String} imageName Initial image name
 * @returns  {String} image name converted to png
 **/

const convertImageNameToPng = imageName => {
  return imageName.slice(0, imageName.lastIndexOf(".")) + ".png";
};

/**
 * Makes a POST call to Mirror AI API to retrieve emojis
 * @param {String} mirrorAPIToken Mirror AI API token
 * @param {Array} uploadedImages Image files uploaded by the user
 * @param {Function} setLoadingState Sets loading boolean to true, then false.
 * @param {Function} setEmojis Sets generated emojis to state
 * @param {Function} setUploadedImages Sets uploaded images to an empty array
 * @param {Function} setErrorMessage Sets error message
 * @returns  Nothing
 **/

export const generateEmojis = async (
  mirrorAPIToken,
  uploadedImages,
  setLoadingState,
  setEmojis,
  setUploadedImages,
  setErrorMessage
) => {
  setLoadingState(true);
  let emojis = [];
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
            "x-token": mirrorAPIToken
          },
          data: form
        }
      );
      if (generatedEmoji.data.face) {
        emojis.push({
          url: generatedEmoji.data.face.url,
          id: generatedEmoji.data.face.id,
          name: convertImageNameToPng(image.name)
        });
      } else {
        setErrorMessage(
          `Ran into some trouble generating one of your emojis. Sorry about that!`
        );
      }
    } catch (err) {
      setErrorMessage(
        `Ran into some trouble generating one of your emojis. Sorry about that!`
      );
      console.error(err);
    }
  }
  setLoadingState(false);
  setUploadedImages([]);
  setEmojis(emojis);
};
