var promise = require("bluebird");
const dotenv = require("dotenv");
dotenv.config();

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString =
  process.env.DATABASE_URL || "postgres://admin@localhost:5432/tipsters";
var db = pgp(connectionString);

module.exports = db;
