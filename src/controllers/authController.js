const authService = require('../services/authService');

class AuthController {
  loginWorker(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Dados inválidos',
        message: 'Username e password são obrigatórios'
      });
    }

    const result = authService.loginWorker(username, password);

    if (!result) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
        message: 'Username ou password incorretos'
      });
    }

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token: result.token,
      role: result.role
    });
  }

  loginTutor(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Dados inválidos',
        message: 'Username e password são obrigatórios'
      });
    }

    const result = authService.loginTutor(username, password);

    if (!result) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
        message: 'Username ou password incorretos'
      });
    }

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token: result.token,
      role: result.role
    });
  }
}

module.exports = new AuthController();
