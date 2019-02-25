// app.js
const express = require("express");
const bodyParser = require("body-parser");

const character = require('./routes/character.route'); // Imports routes for the characters
const app = express();
app.use('/characters', character);



let port = 3200;
app.listen(port, () => {
  console.log("Server is running at port# " + port);
});
