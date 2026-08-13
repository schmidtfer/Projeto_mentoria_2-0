const express = require('express');
const daycareController = require('../controllers/daycareController');
const { authMiddleware, optionalAuthMiddleware, workerMiddleware, tutorMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /daycare/report/:petId/:date
 * @description Obter relatório diário de um pet específico (sem token para o tutor do pet)
 */
router.get('/report/:petId/:date', optionalAuthMiddleware, (req, res) => {
  daycareController.getDailyReport(req, res);
});

/**
 * @route POST /daycare/report
 * @description Criar novo relatório diário (apenas trabalhadores)
 */
router.post('/report', authMiddleware, workerMiddleware, (req, res) => {
  daycareController.createDailyReport(req, res);
});

/**
 * @route PUT /daycare/report/:petId/:date
 * @description Atualizar relatório diário (apenas trabalhadores)
 */
router.put('/report/:petId/:date', authMiddleware, workerMiddleware, (req, res) => {
  daycareController.updateDailyReport(req, res);
});

/**
 * @route DELETE /daycare/report/:petId/:date
 * @description Deletar relatório diário (apenas trabalhadores)
 */
router.delete('/report/:petId/:date', authMiddleware, workerMiddleware, (req, res) => {
  daycareController.deleteDailyReport(req, res);
});


module.exports = router;
