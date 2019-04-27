/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const character = require("./routes/character.route"); // Imports routes for the characters
const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url =
  "mongodb+srv://dustin:13251325@cluster0-dchnu.mongodb.net/cards?retryWrites=true";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/characters", character);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Witcher Character API</h1>");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

const port = process.env.PORT || 4402;

app.listen(port, () => {
  console.log(`RESTful server up and running on port ${port}`);
});
