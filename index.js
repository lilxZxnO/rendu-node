const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ip = require("ip");

const app = express();
const ipAddr = ip.address();
const port = 3000;

let lastHouseVisited = "Slytherin";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour app.get
app.get("/house", (req, res) => {
  res.json({ data: lastHouseVisited });
});

// Route pour app.post
app.post("/house", (req, res) => {
  console.log(req.body);
  lastHouseVisited = req.body.house;
  res.json({ data: lastHouseVisited });
});

app.listen(port, async () => {
  console.log(`Server running at http://${ipAddr}:${port}`);
});
