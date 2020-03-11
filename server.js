const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 5000;

app.post("/getEmojis", async (req, res) => {
  let emojis = [];
  let error = "";
  for (var emoji of req.body.emojis) {
    let res;
    try {
      res = await axios(emoji.url, {
        responseType: "arraybuffer"
      });
      emojis.push({
        base64: Buffer.from(res.data, "binary").toString("base64"),
        name: emoji.name
      });
    } catch (err) {
      console.error(err);
      error = "Error generating an emoji";
    }
  }
  return res.send({ emojis, error });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
