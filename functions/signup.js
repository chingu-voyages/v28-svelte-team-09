const { createUser, login } = require("./utils/auth");

exports.handler = async ({ body }) => {
  // Signs up then logs in and responds with a token for the client to consume.
  var { name, password } = JSON.parse(body);

  try {
    var { ref = null } = await createUser(name, password);
  } catch (error) {
    return {
      statusCode: 400,
      body: "Account already exists.",
    };
  }

  if (ref) {
    var { secret = "", instance = "" } = await login(name, password);

    return (
      secret && {
        statusCode: 200,
        body: JSON.stringify({ secret, instance }),
      }
    );
  }
};
