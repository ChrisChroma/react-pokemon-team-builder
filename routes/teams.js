const express = require("express");
const router = express.Router();
const teamsCtrl = require("../controllers/teams");

router.get("/teams", teamsCtrl.getTeams);
router.get("/teams/remove/:trainerId/:teamId", teamsCtrl.remove);
router.post("/teams/change/name/:teamId", teamsCtrl.updateName);

module.exports = router;
