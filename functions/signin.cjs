const { login } = require("./utils/auth.cjs");

exports.handler = async ({ body }) => {
  var { name, password } = JSON.parse(body);
  try {
    var { secret = "", instance = "" } = await login(name, password);
  } catch (error) {
    return {
      statusCode: 400,
      body: "Not found or invalid password!",
    };
  }

  return (
    secret && {
      statusCode: 200,
      body: JSON.stringify({ secret, instance }),
    }
  );
};
