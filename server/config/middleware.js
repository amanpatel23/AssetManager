const jwt = require("jsonwebtoken");

module.exports.auth = async function (request, response, next) {
  const bToken = request.header("Authorization");
  if (!bToken) {
    return response.status(401).json({ error: "No token provided" });
  }

  try {
    const token = bToken.split(" ")[1];
    const decode = jwt.verify(token, "amanpatel");
    request.userId = decode.userId;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({ error: "Token expired" });
    } else {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
};
