// In-memory database for the pet daycare API
const db = {};

db.tutors = [
  { id: 1, name: 'Caroline', username: 'tutor_bisteca', password: '123456', pets: [1] },
  { id: 2, name: 'Rafael', username: 'tutor_fumaca', password: '123456', pets: [2] },
  { id: 3, name: 'Joana', username: 'tutor_bob', password: '123456', pets: [3] },
  { id: 4, name: 'Renata', username: 'tutor_pacoca', password: '123456', pets: [4] },
  { id: 5, name: 'Mara', username: 'tutor_estopim', password: '123456', pets: [5] }
];

db.workers = [ { id: 1, username: 'userWorker', password: 'worker123' } ];

db.pets = [
  { id: 1, name: 'Bisteca', breed: 'vira-lata', age: 12, weight: 22, tutorId: 1 },
  { id: 2, name: 'Fumaça', breed: 'salsichinha', age: 10, weight: 13, tutorId: 2 },
  { id: 3, name: 'Bob', breed: 'vira-lata', age: 9, weight: 10, tutorId: 3 },
  { id: 4, name: 'Paçoca', breed: 'salsichinha', age: 8, weight: 8, tutorId: 4 },
  { id: 5, name: 'Estopim', breed: 'vira-lata', age: 4, weight: 6, tutorId: 5 }
];

// Generate daycareReports for the date range 2026-08-01 to 2026-08-15 (inclusive)
const daycareReports = [];
let idCounter = 1;
const startDate = new Date('2026-08-01');
const endDate = new Date('2026-08-15');

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const dateStr = d.toISOString().slice(0, 10);

  // For each pet, create a daily report entry
  db.pets.forEach(pet => {
    daycareReports.push({
      id: idCounter++,
      petId: pet.id,
      date: dateStr,
      checkin: '08:00',
      checkout: '17:00',
      dormiu: Math.random() < 0.5 ? 'sim' : 'não',
      consumoAlimentar: Math.random() < 0.5 ? 'pouco' : 'esfomeado',
      nivelEnergia: Math.random() < 0.5 ? 'pouca_bateria' : 'bateria_cheia',
      pagamentoRealizado: Math.random() < 0.8 ? 'sim' : 'não'
    });
  });
}

db.daycareReports = daycareReports;

module.exports = db;
