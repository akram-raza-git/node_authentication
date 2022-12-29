const jwt = require("jsonwebtoken");
const User = require("../modal/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const tokenDecoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({
      _id: tokenDecoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
module.exports = auth;
