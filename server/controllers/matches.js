const db = require("../db");

getMatches = function(req, res, next) {
  db.any(
    `select matches.id, matches.type, matches.league, matches.hostid, matches.guestid, 
    host.name as hostname, host.type as hostsport, host.league as hostleague, 
    guest.name as guestname, guest.type as guestsport, guest.league as guestleague 
    from tipsters.matches as matches  
    inner join tipsters.teams as host on matches.hostid = host.id 
    inner join tipsters.teams as guest on matches.guestid = guest.id
    `
  )
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(err) {
      return next(err);
    });
};

createMatch = function(req, res, next) {
  const match = {
    type: req.body.type,
    league: req.body.league,
    hostid: req.body.hostid,
    guestid: req.body.guestid
  };
  db.none(
    "insert into tipsters.matches(type, league, hostid, guestid)" +
      "values(${type}, ${league}, ${hostid}, ${guestid})",
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted one match"
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

getMatch = function(req, res, next) {
  const matchID = req.params.id;
  db.one("select * from tipsters.matches where id = $1", matchID)
    .then(function(data) {
      res.status(200).json(...data);
    })
    .catch(function(err) {
      return next(err);
    });
};

updateMatch = function(req, res, next) {
  const match = {
    type: req.body.type,
    league: req.body.league,
    hostid: req.body.hostid,
    guestid: req.body.guestid
  };
  db.none(
    "update tipsters.matches set type=$1, league=$2, hostid=$3, guestid=$4 where id=$5",
    [match.type, match.league, match.hostid, match.guestid, req.params.id]
  )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated match"
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

deleteMatch = function(req, res, next) {
  const matchID = req.params.id;
  db.result("delete from tipsters.matches where id = $1", matchID)
    .then(function(result) {
      res.status(200).json({
        status: "success",
        message: `Removed ${result.rowCount} matches`
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports = {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch
};
