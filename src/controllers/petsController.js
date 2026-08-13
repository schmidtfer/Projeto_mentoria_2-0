const petsService = require('../services/petsService');

class PetsController {
  getAllPets(req, res) {
    try {
      const pets = petsService.getAllPets();
      return res.status(200).json({
        message: 'Pets recuperados com sucesso',
        data: pets
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao recuperar pets',
        message: error.message
      });
    }
  }

  getPetById(req, res) {
    try {
      const { petId } = req.params;
      const { name } = req.query;
      const pet = petsService.getPetById(parseInt(petId));

      if (!pet) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com ID ${petId} não existe`
        });
      }

      if (!req.user) {
        return res.status(401).json({
          error: 'Token não fornecido',
          message: 'Authorization header com token Bearer é obrigatório'
        });
      }

      // DEBUG LOG: mostrar req.user para diagnóstico temporário
      console.log('DEBUG getPetById req.user =', req.user);

      if (req.user.role !== 'tutor') {
        return res.status(403).json({
          error: 'Acesso negado',
          message: 'Apenas tutores podem acessar informações específicas do pet'
        });
      }

      if (pet.tutorId !== req.user.tutorId) {
        return res.status(403).json({
          error: 'Acesso negado',
          message: 'Apenas o tutor proprietário do pet pode acessar estas informações'
        });
      }

      if (name && pet.name.toLowerCase() !== String(name).toLowerCase()) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `O nome fornecido não corresponde ao pet com ID ${petId}`
        });
      }

      return res.status(200).json({
        message: 'Pet recuperado com sucesso',
        data: pet
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao recuperar pet',
        message: error.message
      });
    }
  }

  getPetByName(req, res) {
    try {
      const { petName } = req.params;
      const pet = petsService.getPetByName(String(petName));

      if (!pet) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com nome ${petName} não existe`
        });
      }

      if (!req.user) {
        return res.status(401).json({
          error: 'Token não fornecido',
          message: 'Authorization header com token Bearer é obrigatório'
        });
      }

      if (req.user.role !== 'tutor') {
        return res.status(403).json({
          error: 'Acesso negado',
          message: 'Apenas tutores podem acessar informações específicas do pet'
        });
      }

      if (pet.tutorId !== req.user.tutorId) {
        return res.status(403).json({
          error: 'Acesso negado',
          message: 'Apenas o tutor proprietário do pet pode acessar estas informações'
        });
      }

      return res.status(200).json({
        message: 'Pet recuperado com sucesso',
        data: pet
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao recuperar pet',
        message: error.message
      });
    }
  }

  getPetsByTutor(req, res) {
    try {
      const { tutorId } = req.params;
      const pets = petsService.getPetsByTutorId(parseInt(tutorId));

      return res.status(200).json({
        message: 'Pets do tutor recuperados com sucesso',
        data: pets
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao recuperar pets',
        message: error.message
      });
    }
  }

  createPet(req, res) {
    try {
      const { name, breed, age, weight, tutorId } = req.body;

      if (!name || !breed || age === undefined || !weight || !tutorId) {
        return res.status(400).json({
          error: 'Dados inválidos',
          message: 'name, breed, age, weight e tutorId são obrigatórios'
        });
      }

      const newPet = petsService.createPet(name, breed, parseInt(age), parseFloat(weight), parseInt(tutorId));

      if (!newPet) {
        return res.status(400).json({
          error: 'Erro ao criar pet',
          message: 'Falha ao criar novo pet'
        });
      }

      return res.status(201).json({
        message: 'Pet criado com sucesso',
        data: newPet
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao criar pet',
        message: error.message
      });
    }
  }

  updatePet(req, res) {
    try {
      const { petId } = req.params;
      const updatedPet = petsService.updatePet(parseInt(petId), req.body);

      if (!updatedPet) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com ID ${petId} não existe`
        });
      }

      return res.status(200).json({
        message: 'Pet atualizado com sucesso',
        data: updatedPet
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao atualizar pet',
        message: error.message
      });
    }
  }

  deletePet(req, res) {
    try {
      const { petId } = req.params;
      const deleted = petsService.deletePet(parseInt(petId));

      if (!deleted) {
        return res.status(404).json({
          error: 'Pet não encontrado',
          message: `Pet com ID ${petId} não existe`
        });
      }

      return res.status(200).json({
        message: 'Pet deletado com sucesso',
        data: { id: parseInt(petId) }
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao deletar pet',
        message: error.message
      });
    }
  }
}

module.exports = new PetsController();
