import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const zipAndSaveEmojis = async (emojis, setErrorMessage) => {
  const zip = new JSZip();
  let downloadedEmojis;
  try {
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/getEmojis",
      data: { emojis }
    });
    if (res.data.error) {
      return setErrorMessage(
        "Ran into some trouble packaging your emojis! Sorry about that."
      );
    }
    downloadedEmojis = res.data.emojis.map(emoji => ({
      data: b64toBlob(emoji.base64),
      name: emoji.name
    }));
  } catch (err) {
    console.error(err);
  }
  if (!downloadedEmojis) {
    return setErrorMessage(
      "Ran into some trouble packaging your emojis! Sorry about that."
    );
  }
  downloadedEmojis.map(emoji => zip.file(emoji.name, emoji.data));
  const zipped = await zip.generateAsync({ type: "blob" });
  saveAs(zipped, "emojis.zip");
};

export { zipAndSaveEmojis };
