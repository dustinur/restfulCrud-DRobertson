const Character = require("../models/character.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("This is the test controller!");
};

exports.character_all = function(req, res) {
  Character.find(req.params.id, function(err, character) {
    if (err) return next(err);
    res.send(character);
  });
};

exports.character_create = function(req, res) {
  let character = new Character({
    name: req.body.name,
    classType: req.body.classType,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  });

  character.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Character Created successfully");
  });
};

exports.character_details = function(req, res) {
  Character.findById(req.params.id, function(err, character) {
    if (err) return next(err);
    res.send(character);
  });
};

exports.character_update = function(req, res) {
  Character.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    character
  ) {
    if (err) return next(err);
    res.send("Character udpated.");
  });
};

exports.character_delete = function(req, res) {
  Character.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Character deleted successfully!");
  });
};
