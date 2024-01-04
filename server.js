const express = require('express');
const app = express();
// const db = require('./database/database.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/login', (req, res) => {

    res.sendFile(__dirname + '/public/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const utilisateurRouter = require('./route/utilisateurRoute.js');
const commentaireRouter = require('./route/commentaireRoute.js');
const technologieRouter = require('./route/technologieRoute.js');

//-------------------------------------------------- UTILISATEURS ---------------------------------------------------------------------------//

app.use('/utilisateur', utilisateurRouter);

//-------------------------------------------------- COMMENTAIRES ---------------------------------------------------------------------------//

app.use('/commentaires', commentaireRouter);

 //-------------------------------------------------- Technologies ---------------------------------------------------------------------------//
app.use('/technologies', technologieRouter);

app.listen(8000, () => 
console.log('Serveur sur le port 8000'));