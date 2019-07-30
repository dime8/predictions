const db = require("../db");

getMatchPredictions = function(req, res, next) {
  db.any(
    `
select predictions.id, predictions.userid, users.username, predictions.score
from tipsters.predictions as predictions
inner join tipsters.users as users on predictions.userid = users.id
where predictions.matchid  = '${req.params.matchid}'`
  )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

createMatchPrediction = function(req, res, next) {
  const prediction = {
    matchid: req.body.matchid,
    userid: req.body.userid,
    score: req.body.score
  };
  db.none(
    "insert into tipsters.predictions(matchid, userid, score)" +
      "values(${matchid}, ${userid}, ${score})",
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted one prediction"
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

getMatchPrediction = function(req, res, next) {
  // const matchID = req.params.matchid;
  // db.one("select * from tipsters.matches where id = $1", matchID)
  //   .then(function(data) {
  //     res.status(200).json(...data);
  //   })
  //   .catch(function(err) {
  //     return next(err);
  //   });
};

updateMatchPrediction = function(req, res, next) {
  // const match = {
  //   type: req.body.type,
  //   league: req.body.league,
  //   hostid: req.body.hostid,
  //   guestid: req.body.guestid
  // };
  // db.none(
  //   "update tipsters.matches set type=$1, league=$2, hostid=$3, guestid=$4 where id=$5",
  //   [match.type, match.league, match.hostid, match.guestid, req.params.id]
  // )
  //   .then(function() {
  //     res.status(200).json({
  //       status: "success",
  //       message: "Updated match"
  //     });
  //   })
  //   .catch(function(err) {
  //     return next(err);
  //   });
};

deleteMatchPrediction = function(req, res, next) {
  // const matchID = req.params.id;
  // db.result("delete from tipsters.matches where id = $1", matchID)
  //   .then(function(result) {
  //     res.status(200).json({
  //       status: "success",
  //       message: `Removed ${result.rowCount} matches`
  //     });
  //   })
  //   .catch(function(err) {
  //     return next(err);
  //   });
};

module.exports = {
  getMatchPredictions,
  getMatchPrediction,
  createMatchPrediction,
  updateMatchPrediction,
  deleteMatchPrediction
};
