const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CharacterSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  classType: { type: String, required: true, max: 100 },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("Character", CharacterSchema);
