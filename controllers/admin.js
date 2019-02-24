const Character = require("../models/character");

exports.getAddCharacter = (req, res, next) => {
  res.render("admin/edit-character", {
    pageTitle: "Add Character",
    path: "/admin/add-character",
    editing: false
  });
};

exports.postAddCharacter = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const classType = req.body.classType;
  const description = req.body.description;
  const character = new Character(name, classType, description, imageUrl);
  character
    .save()
    .then(result => {
      // console.log(result);
      console.log("Created Character");
      res.redirect("/admin/characters");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditCharacter = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const charId = req.params.characterId;
  Character.findById(charId)
    .then(character => {
      if (!character) {
        return res.redirect("/");
      }
      res.render("admin/edit-character", {
        pageTitle: "Edit character",
        path: "/admin/edit-character",
        editing: editMode,
        character: character
      });
    })
    .catch(err => console.log(err));
};

exports.postEditCharacter = (req, res, next) => {
  const charId = req.body.characterId;
  const updatedName = req.body.name;
  const updatedClassType = req.body.classType;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const character = new Character(
    updatedName,
    updatedClassType,
    updatedDesc,
    updatedImageUrl,
    charId
  );
  character
    .save()
    .then(result => {
      console.log("UPDATED character!");
      res.redirect("/admin/characters");
    })
    .catch(err => console.log(err));
};

exports.getCharacters = (req, res, next) => {
  Character.fetchAll()
    .then(characters => {
      res.render("admin/characters", {
        chars: characters,
        pageTitle: "Admin characters",
        path: "/admin/characters"
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteCharacter = (req, res, next) => {
  const charId = req.body.characterId;
  Character.deleteById(charId)
    .then(() => {
      console.log("Destroyed Character");
      res.redirect("/admin/characters");
    })
    .catch(err => console.log(err));
};
