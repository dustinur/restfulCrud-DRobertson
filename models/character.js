const mongodb = require('mongodb');
const getDb = require("../util/database").getDb;

class Character {
  constructor(name, classType, description, imageUrl) {
    this.name = name;
    this.classType = classType;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
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
      .collection('characters')
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
