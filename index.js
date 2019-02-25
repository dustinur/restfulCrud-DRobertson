// localhost:3200/characters/test
// localhost:3200/characters/create ----- Choose 'x-www-form-urlencoded' in the Body tab in Postman
// localhost:3200/characters/PRODUCT_ID
// localhost:3200/characters/PRODUCT_ID/update
// localhost:3200/characters/PRODUCT_ID/delete

const express = require("express");
const bodyParser = require("body-parser");
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

const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
