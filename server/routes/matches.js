const express = require("express");

const Maches = require("../controllers/matches");

const router = express.Router();

router.get("/", Maches.getMatches);
router.post("/", Maches.createMatch);
router.get("/:id", Maches.getMatch);
router.put("/:id", Maches.updateMatch);
router.delete("/:id", Maches.deleteMatch);

module.exports = router;
