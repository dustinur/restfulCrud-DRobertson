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
    db.collection("characters")
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Character;