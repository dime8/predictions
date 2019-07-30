const express = require("express");

const Predictions = require("../controllers/predictions");

const router = express.Router();

router.get("/:matchid/predictions/", Predictions.getMatchPredictions);
router.post("/:matchid/predictions/", Predictions.createMatchPrediction);
router.get("/:matchid/predictions/:id", Predictions.getMatchPrediction);
router.put("/:matchid/predictions/:id", Predictions.updateMatchPrediction);
router.delete("/:matchid/predictions/:id", Predictions.deleteMatchPrediction);

module.exports = router;
