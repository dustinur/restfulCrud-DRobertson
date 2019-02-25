const Character = require("../models/character");

exports.getCharacters = (req, res, next) => {
  Character.fetchAll()
    .then(characters => {
      res.render("card-list/character-list", {
        chars: characters,
        pageTitle: "All Characters",
        path: "/characters"
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
      res.render("card-list/character-detail", {
        character: character,
        pageTitle: character.title,
        path: "/characters"
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Character.fetchAll()
    .then(characters => {
      res.render("card-list/index", {
        chars: characters,
        pageTitle: "Cards",
        path: "/"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(characters => {
      res.render("card-list/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        characters: characters
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const charId = req.body.characterId;
  Character.findById(charId)
    .then(character => {
      return req.user.addToCart(character);
    })
    .then(result => {
      console.log(result);
      res.redirect("cart");
    });
};

exports.postCartDeleteCharacter = (req, res, next) => {
  const charId = req.body.characterId;
  req.user
    .deleteItemFromCart(charId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
  .addOrder()
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render("card-list/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
