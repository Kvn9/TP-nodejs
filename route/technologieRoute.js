const express = require('express');
const router = express.Router();
const technologieController = require('../controllers/technologieController');
const middleware = require('../middleware/middleware');
// const { router } = require('../route/technologieRoute');

router.get('/getAlltechnologie', middleware.authenticator, technologieController.getAllTechnologie);
router.get('/getAllTechnologie', technologieController.getAllTechnologie);
router.post('/insertTechnologie',  technologieController.insertTechnologie);
router.get('/getTechnologieID/:id', technologieController.getTechnologieID);
router.get('/getTechnologieUser', technologieController.getTechnologieUser);
router.delete('/deleteTechnologie/:id',  technologieController.deleteTechnologie);
router.put('/updateTechnologie/:id',  technologieController.updateTechnologie);


module.exports = router