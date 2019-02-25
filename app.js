// localhost:3200/characters/test
// localhost:3200/characters/create
// app.js

const express = require("express");
const bodyParser = require("body-parser");

const character = require("./routes/character.route"); // Imports routes for the characters
const app = express();
app.use('/characters', character);

// Set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url =
  "mongodb+srv://dustin:13251325@cluster0-dchnu.mongodb.net/cards?retryWrites=true";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/characters", character);

let port = 3200;

app.listen(port, () => {
  console.log("Server is running at port# " + port);
});
