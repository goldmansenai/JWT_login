const { verify } = require("jsonwebtoken");

const tokenValidation = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "Usuário não fez o login" });
  }

  try {
    const validToken = verify(accessToken, "mySecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
module.exports = { tokenValidation };
