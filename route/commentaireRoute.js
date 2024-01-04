const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');
const middleware = require('../middleware/middleware');

router.get('/getAllcommentaire', middleware.authenticator, commentaireController.getAllCommentaire);
router.post('/insertCommentaire', middleware.authenticator, middleware.checkRole(['journaliste', 'administrateur']), commentaireController.insertCommentaire);
router.get('/getCommentaireID', commentaireController.getCommentaireID);
router.get('/getCommentaireTechnologieID', commentaireController.getCommentaireTechnologieID);
router.get('/getCommentaireUserID', commentaireController.getCommentaireUserID);
router.get('/getCommentaireDate', commentaireController.getCommentaireDate);

module.exports = router;
