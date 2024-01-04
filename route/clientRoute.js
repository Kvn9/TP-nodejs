const express = require('express');
const router = express.Router();
const clientControllers = require('../controllers/clientControllers');
const middleware = require('../middleware/middleware');

router.get('/getAllClient', middleware.authenticator, clientControllers.getAllClient);
router.post('/register', clientControllers.register);
router.post('/login', clientControllers.login);

module.exports = router