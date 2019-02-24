const path = require('path');

const express = require('express');

const cardListController = require('../controllers/card-list');

const router = express.Router();

router.get('/', cardListController.getIndex);

router.get('/characters', cardListController.getCharacters);

router.get('/characters/:characterId', cardListController.getCharacter);

router.get('/cart', cardListController.getCart);

router.post('/cart', cardListController.postCart);

// router.post('/cart-delete-item', cardListController.postCartDeleteCharacter);

// router.post('/create-order', cardListController.postOrder);

// router.get('/orders', cardListController.getOrders);

module.exports = router;
