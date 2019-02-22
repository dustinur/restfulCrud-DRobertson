const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const MongoConnect = (callback) => {

MongoClient.connect(
  "mongodb+srv://dustin:13251325@cluster0-dchnu.mongodb.net/test?retryWrites=true"
)
  .then( client => {
    console.log('Connected!');
    callback(client);
    })
  .catch(err => {
    console.log(err);
  });
};

module.exports = MongoConnect;
