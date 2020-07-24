const express = require("express");
const router = express.Router();
const pokemonCtrl = require("../controllers/pokemon");

router.get("/pokemon", pokemonCtrl.index);
router.get("/pokemon/:id", pokemonCtrl.show);
router.get("/pokemon/add/:teamId", pokemonCtrl.index);

module.exports = router;
