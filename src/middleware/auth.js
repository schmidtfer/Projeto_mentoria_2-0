const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key_change_in_production';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Token não fornecido',
      message: 'Authorization header com token Bearer é obrigatório'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido',
      message: error.message
    });
  }
};

const optionalAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido',
      message: error.message
    });
  }
};

const workerMiddleware = (req, res, next) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({
      error: 'Acesso negado',
      message: 'Apenas trabalhadores da creche têm acesso a este recurso'
    });
  }
  next();
};

const tutorMiddleware = (req, res, next) => {
  if (req.user.role !== 'tutor') {
    return res.status(403).json({
      error: 'Acesso negado',
      message: 'Apenas tutores têm acesso a este recurso'
    });
  }
  next();
};

module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
  workerMiddleware,
  tutorMiddleware,
  JWT_SECRET
};
