const daycareService = require('../services/daycareService');
const petsService = require('../services/petsService');

class DaycareController {
  getDailyReport(req, res) {
    try {
      const { petId, date } = req.params;

      const pet = petsService.getPetById(parseInt(petId));
      if (!pet) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com ID ${petId} não existe`
        });
      }

      if (req.user && req.user.role === 'tutor' && pet.tutorId !== req.user.tutorId) {
        return res.status(403).json({
          error: 'Acesso negado',
          message: 'Você só pode consultar relatórios dos seus próprios pets'
        });
      }

      const report = daycareService.getDailyReport(parseInt(petId), date);

      if (!report) {
        return res.status(404).json({
          error: 'Relatório não encontrado',
          message: `Relatório para o pet ${petId} na data ${date} não existe`
        });
      }

      return res.status(200).json({
        message: 'Relatório recuperado com sucesso',
        data: report
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao recuperar relatório',
        message: error.message
      });
    }
  }

  createDailyReport(req, res) {
    try {
      const { petId, date, checkin, checkout, dormiu, consumoAlimentar, nivelEnergia, pagamentoRealizado } = req.body;

      if (!petId || !date || !checkin) {
        return res.status(400).json({
          error: 'Dados inválidos',
          message: 'petId, date e checkin são obrigatórios'
        });
      }

      const pet = petsService.getPetById(parseInt(petId));
      if (!pet) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com ID ${petId} não existe`
        });
      }

      const existingReport = daycareService.getDailyReport(parseInt(petId), date);
      if (existingReport) {
        return res.status(409).json({
          error: 'Relatório já existe',
          message: `Já existe um relatório para este pet na data ${date}`
        });
      }

      const report = daycareService.createDailyReport(
        parseInt(petId),
        date,
        checkin,
        checkout,
        dormiu,
        consumoAlimentar,
        nivelEnergia,
        pagamentoRealizado
      );

      if (!report) {
        return res.status(400).json({
          error: 'Erro ao criar relatório',
          message: 'Falha ao criar novo relatório'
        });
      }

      return res.status(201).json({
        message: 'Relatório criado com sucesso',
        data: report
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao criar relatório',
        message: error.message
      });
    }
  }

  updateDailyReport(req, res) {
    try {
      const { petId, date } = req.params;

      const pet = petsService.getPetById(parseInt(petId));
      if (!pet) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com ID ${petId} não existe`
        });
      }

      const report = daycareService.updateDailyReport(parseInt(petId), date, req.body);

      if (!report) {
        return res.status(404).json({
          error: 'Relatório não encontrado',
          message: `Relatório para o pet ${petId} na data ${date} não existe`
        });
      }

      return res.status(200).json({
        message: 'Relatório atualizado com sucesso',
        data: report
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao atualizar relatório',
        message: error.message
      });
    }
  }

  deleteDailyReport(req, res) {
    try {
      const { petId, date } = req.params;

      const pet = petsService.getPetById(parseInt(petId));
      if (!pet) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com ID ${petId} não existe`
        });
      }

      const deleted = daycareService.deleteDailyReport(parseInt(petId), date);

      if (!deleted) {
        return res.status(404).json({
          error: 'Relatório não encontrado',
          message: `Relatório para o pet ${petId} na data ${date} não existe`
        });
      }

      return res.status(200).json({
        message: 'Relatório deletado com sucesso',
        data: { petId: parseInt(petId), date }
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao deletar relatório',
        message: error.message
      });
    }
  }

}

module.exports = new DaycareController();
