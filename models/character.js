const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Character {
  constructor(name, classType, description, imageUrl, id) {
    this.name = name;
    this.classType = classType;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("characters")
        .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("characters").insertOne(this);
    }
    const db = getDb();
    return db
      .collection("characters")
      .insertOne(this)
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
}

module.exports = Character;
