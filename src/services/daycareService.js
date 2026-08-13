const db = require('../models/db');
const petsService = require('./petsService');

class DaycareService {
  getDailyReport(petId, date) {
    return db.daycareReports.find(
      r => r.petId === petId && r.date === date
    );
  }

  createDailyReport(petId, date, checkin, checkout, dormiu, consumoAlimentar, nivelEnergia, pagamentoRealizado) {
    if (!petId || !date || !checkin) {
      return null;
    }

    const pet = petsService.getPetById(petId);
    if (!pet) {
      return null;
    }

    const report = {
      id: db.daycareReports.length > 0 ? Math.max(...db.daycareReports.map(r => r.id || 0)) + 1 : 1,
      petId,
      date,
      checkin,
      checkout: checkout || null,
      dormiu: dormiu === 'sim' ? 'sim' : 'não',
      consumoAlimentar: consumoAlimentar || 'pouco',
      nivelEnergia: nivelEnergia || 'pouca_bateria',
      pagamentoRealizado: pagamentoRealizado === 'sim' ? 'sim' : 'não'
    };

    db.daycareReports.push(report);
    return report;
  }

  updateDailyReport(petId, date, data) {
    const report = this.getDailyReport(petId, date);
    if (!report) {
      return null;
    }

    if (data.checkin !== undefined) report.checkin = data.checkin;
    if (data.checkout !== undefined) report.checkout = data.checkout;
    if (data.dormiu !== undefined) report.dormiu = data.dormiu;
    if (data.consumoAlimentar !== undefined) report.consumoAlimentar = data.consumoAlimentar;
    if (data.nivelEnergia !== undefined) report.nivelEnergia = data.nivelEnergia;
    if (data.pagamentoRealizado !== undefined) report.pagamentoRealizado = data.pagamentoRealizado;

    return report;
  }

  deleteDailyReport(petId, date) {
    const index = db.daycareReports.findIndex(
      r => r.petId === petId && r.date === date
    );

    if (index === -1) {
      return false;
    }

    db.daycareReports.splice(index, 1);
    return true;
  }

  getPetCheckInStatus(petId, date) {
    const report = this.getDailyReport(petId, date);
    if (!report) {
      return { checkedIn: false };
    }

    return {
      checkedIn: true,
      checkin: report.checkin,
      checkout: report.checkout || null
    };
  }
}

module.exports = new DaycareService();
