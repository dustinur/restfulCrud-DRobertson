const express = require("express");
const router = express.Router();

const character_controller = require("../controllers/character.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", character_controller.test);

router.get("/", character_controller.character_all);
router.post("/create", character_controller.character_create);
router.get("/:id", character_controller.character_details);
router.put("/:id/update", character_controller.character_update);
router.delete("/:id/delete", character_controller.character_delete);

module.exports = router;
