const express = require('express');
const petsController = require('../controllers/petsController');
const { authMiddleware, optionalAuthMiddleware, workerMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /pets
 * @description Obter todos os pets (apenas trabalhadores)
 */
router.get('/', authMiddleware, workerMiddleware, (req, res) => {
  petsController.getAllPets(req, res);
});

/**
 * @route GET /pets/name/:petName
 * @description Obter dados específicos de um pet por nome (somente tutor do pet com token)
 */
router.get('/name/:petName', authMiddleware, (req, res) => {
  petsController.getPetByName(req, res);
});

/**
 * @route POST /pets
 * @description Registrar novo pet (apenas trabalhadores)
 */
router.post('/', authMiddleware, workerMiddleware, (req, res) => {
  petsController.createPet(req, res);
});

/**
 * @route PUT /pets/:petId
 * @description Atualizar dados de um pet (apenas trabalhadores)
 */
router.put('/:petId', authMiddleware, workerMiddleware, (req, res) => {
  petsController.updatePet(req, res);
});

/**
 * @route DELETE /pets/:petId
 * @description Deletar um pet (apenas trabalhadores)
 */
router.delete('/:petId', authMiddleware, workerMiddleware, (req, res) => {
  petsController.deletePet(req, res);
});

module.exports = router;
