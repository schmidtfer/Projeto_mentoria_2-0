const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @route POST /auth/login-worker
 * @description Login como trabalhador da creche
 */
router.post('/login-worker', (req, res) => {
  authController.loginWorker(req, res);
});

/**
 * @route POST /auth/login-tutor
 * @description Login como tutor
 */
router.post('/login-tutor', (req, res) => {
  authController.loginTutor(req, res);
});

module.exports = router;
