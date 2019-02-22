const Character = require('../models/character');

exports.getAddCharacter = (req, res, next) => {
  res.render('admin/edit-character', {
    pageTitle: 'Add Character',
    path: '/admin/add-character',
    editing: false
  });
};

exports.postAddCharacter = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createCharacter({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(result => {
      // console.log(result);
      console.log('Created Character');
      res.redirect('/admin/characters');
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.getEditCharacter = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const charId = req.params.characterId;
//   req.user
//     .getCharacters({ where: { id: charId } })
//     // character.findById(charId)
//     .then(characters => {
//       const character = characters[0];
//       if (!character) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-character', {
//         pageTitle: 'Edit character',
//         path: '/admin/edit-character',
//         editing: editMode,
//         character: character
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditCharacter = (req, res, next) => {
//   const charId = req.body.characterId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   character.findById(charId)
//     .then(character => {
//       character.title = updatedTitle;
//       character.price = updatedPrice;
//       character.description = updatedDesc;
//       character.imageUrl = updatedImageUrl;
//       return character.save();
//     })
//     .then(result => {
//       console.log('UPDATED character!');
//       res.redirect('/admin/characters');
//     })
//     .catch(err => console.log(err));
// };

// exports.getcharacters = (req, res, next) => {
//   req.user
//     .getcharacters()
//     .then(characters => {
//       res.render('admin/characters', {
//         chars: characters,
//         pageTitle: 'Admin characters',
//         path: '/admin/characters'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeletecharacter = (req, res, next) => {
//   const charId = req.body.characterId;
//   character.findById(charId)
//     .then(character => {
//       return character.destroy();
//     })
//     .then(result => {
//       console.log('DESTROYED character');
//       res.redirect('/admin/characters');
//     })
//     .catch(err => console.log(err));
// };
