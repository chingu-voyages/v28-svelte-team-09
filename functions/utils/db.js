var faunadb = require("faunadb");
// Just a wrapper for querying w/ server key.
var client = new faunadb.Client({ secret: process.env.FAUNA_KEY });
exports.query = (cb) => {
  return client.query(cb);
};
