const { query } = require("./db.cjs");
const {
  Login,
  Match,
  Index,
  TimeAdd,
  Now,
  Create,
  Collection,
} = require("faunadb").query;

exports.login = (name, password, ttl = [30, "days"]) =>
  query(
    Login(Match(Index("unique_User_name"), name), {
      password,
      ttl: TimeAdd(Now(), ...ttl),
    })
  );

exports.createUser = (name, password) =>
  query(
    Create(Collection("User"), {
      data: {
        name,
      },
      credentials: {
        password,
      },
    })
  );
