// import express (after npm install express)
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// create new express app and save it as "app"
const app = express();

app.use(express.json({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

// server configuration
const PORT = 5000;

// create a route for the app
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

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
