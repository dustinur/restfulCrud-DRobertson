const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://dustin:13251325@cluster0-dchnu.mongodb.net/card-list?retryWrites=true",
    { useNewUrlParser: true }
  )
    .then(client => {
      console.log("Connected at port 3000!");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = MongoConnect;
exports.getDb = getDb;
