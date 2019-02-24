const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-character => GET
router.get('/add-character', adminController.getAddCharacter);

// /admin/characters => GET
router.get('/characters', adminController.getCharacters);

// /admin/add-character => POST
router.post('/add-character', adminController.postAddCharacter);

router.get('/edit-character/:characterId', adminController.getEditCharacter);

router.post('/edit-character', adminController.postEditCharacter);

router.post('/delete-character', adminController.postDeleteCharacter);

module.exports = router;
