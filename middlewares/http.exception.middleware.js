const {
  BadRequestError,
  Unauthorized,
  Forbidden,
  PreconditionFailed,
  NotFound,
  InternalServerError,
  InvalidParamsError,
  ValidationError,
} = require('../helper/http.exception.helper');

//* Error Handling Middleware
module.exports = (err, req, res, next) => {
  //* err.message 가 존재할 경우.
  if (err.message !== '') {
    if (err instanceof BadRequestError)
      return res.status(400).json({ errorMessage: err.message });
    if (err instanceof Unauthorized)
      return res.status(401).json({ errorMessage: err.message });
    if (err instanceof Forbidden)
      return res.status(403).json({ errorMessage: err.message });
    if (err instanceof PreconditionFailed)
      return res.status(412).json({ errorMessage: err.message });
    if (err instanceof NotFound)
      return res.status(404).json({ errorMessage: err.message });
    if (err instanceof InternalServerError) {
      return res.status(500).json({ errorMessage: err.message });
    }
    if (err instanceof InvalidParamsError)
      return res.status(409).json({ errorMessage: err.message });
    if (err instanceof ValidationError)
      return res.status(409).json({ errorMessage: err.message });
  }
  //* err.message가 존재하지 않을경우.

  if (err instanceof BadRequestError) return res.sendStatus(400);
  if (err instanceof Unauthorized) return res.sendStatus(401);
  if (err instanceof Forbidden) return res.sendStatus(403);
  if (err instanceof PreconditionFailed) return res.sendStatus(412);
  if (err instanceof NotFound) return res.sendStatus(404);
  if (err instanceof InternalServerError) {
    return res.sendStatus(500);
  }
  if (err instanceof InvalidParamsError) return res.sendStatus(409);
  if (err instanceof ValidationError) return res.sendStatus(409);

  next();
};
