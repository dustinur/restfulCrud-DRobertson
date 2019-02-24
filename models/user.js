const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(character) {
    const cartCharacterIndex = this.cart.items.findIndex(cc => {
      return cc.characterId.toString() === character._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartCharacterIndex >= 0) {
      newQuantity = this.cart.items[cartCharacterIndex].quantity + 1;
      updatedCartItems[cartCharacterIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        characterId: new ObjectId(character._id),
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const characterIds = this.cart.items.map(i => {
      return i.characterId;
    });
    return db
      .collection('characters')
      .find({ _id: { $in: characterIds } })
      .toArray()
      .then(characters => {
        return characters.map(c => {
          return {
            ...c,
            quantity: this.cart.items.find(i => {
              return i.characterId.toString() === c._id.toString();
            }).quantity
          };
        });
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
