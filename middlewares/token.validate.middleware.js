require('dotenv').config();
const {
  BadRequestError,
  Unauthorized,
} = require('../helper/http.exception.helper');
const jwt = require('jsonwebtoken');
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return false;
  }
}
module.exports = async (req, res, next) => {
  const bearerToken = req.cookies.Authorization;
  //* cookie에 Token이 존재하지 않을경우 401번 에러.
  if (!bearerToken) throw new Unauthorized('토큰이 존재하지 않습니다.');

  const accessToken = bearerToken.split('Bearer ')[1];
  const validatedToken = verifyToken(accessToken);

  //* Token이 유효하지 않을경우 401번 에러.
  if (!validatedToken) Unauthorized('유효하지 않은 토큰입니다.');

  const decodedToken = jwt.decode(accessToken);

  //* Token이 유효할 경우 res.locals에 담음.
  res.locals.decodedAccessToken = decodedToken;
  next();
  return;
};
