const express = require("express");
const router = express.Router();
const trainersCtrl = require("../controllers/trainers");

router.get("/trainers", trainersCtrl.index);
router.post("/trainers/teams/add/:teamId/:pokemonId", trainersCtrl.addToTeam);
router.post(
  "/trainers/teams/remove/:teamId/:pokemonIdx",
  trainersCtrl.deleteFromTeam
);
router.post("/trainers/teams/new", trainersCtrl.createTeam);

module.exports = router;
