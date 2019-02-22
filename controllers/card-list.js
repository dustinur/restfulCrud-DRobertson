const Character = require('../models/character');

exports.getCharacters = (req, res, next) => {
  Character.findAll()
    .then(characters => {
      res.render('card-list/character-list', {
        chars: characters,
        pageTitle: 'All Characters',
        path: '/characters'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCharacter = (req, res, next) => {
  const charId = req.params.characterId;
  // Character.findAll({ where: { id: charId } })
  //   .then(characters => {
  //     res.render('card-list/character-detail', {
  //       character: characters[0],
  //       pageTitle: characters[0].title,
  //       path: '/characters'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Character.findById(charId)
    .then(character => {
      res.render('card-list/character-detail', {
        character: character,
        pageTitle: character.title,
        path: '/characters'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Character.findAll()
    .then(characters => {
      res.render('card-list/index', {
        chars: characters,
        pageTitle: 'Cards',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getCharacters()
        .then(characters => {
          res.render('card-list/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            characters: characters
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const charId = req.body.characterId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getCharacters({ where: { id: charId } });
    })
    .then(characters => {
      let character;
      if (characters.length > 0) {
        character = characters[0];
      }

      if (character) {
        const oldQuantity = character.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return character;
      }
      return Character.findById(charId);
    })
    .then(character => {
      return fetchedCart.addCharacter(character, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteCharacter = (req, res, next) => {
  const charId = req.body.characterId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getCharacters({ where: { id: charId } });
    })
    .then(characters => {
      const character = characters[0];
      return character.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getCharacters();
    })
    .then(characters => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addCharacters(
            characters.map(character => {
              character.orderItem = { quantity: character.cartItem.quantity };
              return character;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setCharacters(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['characters']})
    .then(orders => {
      res.render('card-list/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
