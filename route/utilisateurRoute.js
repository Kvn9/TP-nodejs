const express = require('express');
const router = express.Router();
const utilisateurRoute = require('../controllers/utilisateurController');
const middleware = require('../middleware/middleware');

router.get('/getAllUtilisateur', middleware.authenticator, utilisateurRoute.getAllUtilisateur);
router.put('/uptadeUtilisateur/:id', utilisateurRoute.updateUtilisateur);
router.delete('/deleteUtilisateur/:id', utilisateurRoute.deleteUtilisateur);
router.get('/getUtilisateurID/:id', utilisateurRoute.getUtilisateurID);
router.post('/insertUtilisateur', utilisateurRoute.insertUtilisateur);
router.post('/login', utilisateurRoute.login);
router.post('/register', utilisateurRoute.register);

module.exports = router;