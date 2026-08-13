const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { JWT_SECRET } = require('../middleware/auth');

class AuthService {
  loginWorker(username, password) {
    const worker = db.workers.find(w => w.username === username && w.password === password);
    
    if (!worker) {
      return null;
    }

    const token = jwt.sign(
      { id: worker.id, username: worker.username, role: 'worker' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, role: 'worker' };
  }

  loginTutor(username, password) {
    const tutor = db.tutors.find(t => t.username === username && t.password === password);
    
    if (!tutor) {
      return null;
    }

    const token = jwt.sign(
      { id: tutor.id, username: tutor.username, role: 'tutor', tutorId: tutor.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, role: 'tutor' };
  }
}

module.exports = new AuthService();
