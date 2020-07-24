const express = require("express");
const router = express.Router();
const trainersCtrl = require("../controllers/trainers");

router.get("/trainers/:trainerId/teams", trainersCtrl.getTrainerTeams);
router.post("/trainers/teams/add/:teamId/:pokemonId", trainersCtrl.addToTeam);
router.post(
  "/trainers/teams/remove/:teamId/:pokemonIdx",
  trainersCtrl.deleteFromTeam
);
router.post("/trainers/favorites/add/:pokemonId", trainersCtrl.addToFavorites);
router.get("/trainers/:trainerId/favorites", trainersCtrl.getFavorites);
router.post(
  "/trainers/favorites/remove/:pokemonIdx",
  trainersCtrl.deleteFromFavorites
);
router.post("/trainers/teams/new", trainersCtrl.createTeam);

module.exports = router;
