const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Character {
  constructor(name, classType, description, imageUrl, id, userId) {
    this.name = name;
    this.classType = classType;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("characters")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("characters").insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("characters")
      .find()
      .toArray()
      .then(characters => {
        console.log(characters);
        return characters;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(charId) {
    const db = getDb();
    return db
      .collection("characters")
      .find({ _id: new mongodb.ObjectID(charId) })
      .next()
      .then(character => {
        console.log(character);
        return character;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("characters")
      .deleteOne({ _id: new mongodb.ObjectID(prodId) })
      .then(result => {
        console.log("Deleted");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Character;
