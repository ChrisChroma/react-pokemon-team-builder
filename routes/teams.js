const express = require("express");
const router = express.Router();
const teamsCtrl = require("../controllers/teams");

router.get("/teams", teamsCtrl.index);
router.get("/teams/remove/:teamId", teamsCtrl.remove);
router.post("/teams/change/name/:teamId", teamsCtrl.updateName);

module.exports = router;
