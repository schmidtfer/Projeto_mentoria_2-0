const db = require('../models/db');

class PetsService {
  getAllPets() {
    return db.pets;
  }

  getPetById(petId) {
    return db.pets.find(p => p.id === petId);
  }

  getPetByName(name) {
    if (!name) return null;
    return db.pets.find(p => String(p.name).toLowerCase() === String(name).toLowerCase());
  }

  getPetsByTutorId(tutorId) {
    return db.pets.filter(p => p.tutorId === tutorId);
  }

  createPet(name, breed, age, weight, tutorId) {
    if (!name || !breed || !age || !weight || !tutorId) {
      return null;
    }

    const newPet = {
      id: db.pets.length > 0 ? Math.max(...db.pets.map(p => p.id)) + 1 : 1,
      name,
      breed,
      age,
      weight,
      tutorId
    };

    db.pets.push(newPet);
    return newPet;
  }

  updatePet(petId, data) {
    const pet = this.getPetById(petId);
    if (!pet) {
      return null;
    }

    if (data.name) pet.name = data.name;
    if (data.breed) pet.breed = data.breed;
    if (data.age) pet.age = data.age;
    if (data.weight) pet.weight = data.weight;

    return pet;
  }

  deletePet(petId) {
    const index = db.pets.findIndex(p => p.id === petId);
    if (index === -1) {
      return false;
    }

    db.pets.splice(index, 1);
    return true;
  }
}

module.exports = new PetsService();
