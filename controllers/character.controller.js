const Character = require('../models/character.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('This is the test controller!');
};