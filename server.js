const express = require('express');
const app = express();
const db = require('./database.js');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use(express.static('public'));



app.post('/utilisateur', async (req, res) => {
    const { nom, prenom, email } = req.body;
    const sqlSelect = "SELECT id FROM utilisateur WHERE email = ?";
    
    try {
        const [rows] = await db.query(sqlSelect, [email]);

        if (rows && rows.length > 0) {
            // L'utilisateur avec cette adresse e-mail existe déjà
            return res.status(409).json({ error: 'Adresse e-mail déjà utilisée' });
        } else {
            const sqlInsert = "INSERT INTO utilisateur (nom, prenom, email) VALUES (?, ?, ?)";
            await db.query(sqlInsert, [nom, prenom, email]);
            return res.status(201).json({ message: 'Utilisateur créé' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout de l\'utilisateur' });
    }
});

  app.put('/utilisateurs/:id', async (req, res) => {
      const userId = req.params.id;
      const { nom, prenom, email } = req.body;
      const sql = 'UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?';
      const result = await db.query(sql, [nom, prenom, email, userId]);
      res.json({ message: 'Utilisateur mis à jour avec succès' });
  });


  app.delete('/utilisateurs/:id', async (req, res) => {
      const userId = req.params.id;
      const sql = 'DELETE FROM utilisateur WHERE id = ?';
      const result = await db.query(sql, [userId]);
      res.json({ message: 'Utilisateur supprimé avec succès' });
  });

  app.get('/utilisateurs', async (req, res) => {
    try {
        const sql = 'SELECT * FROM utilisateur'; // Sélectionnez tous les utilisateurs
        const utilisateurs = await db.query(sql);
        res.json(utilisateurs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des utilisateurs.' });
    }
});

app.get('/utilisateur/:id', async (req, res) => {
    const utilisateurid= req.params.id;
    const sql = 'SELECT * FROM utilisateur WHERE id = ?';
    const result = await db.query(sql, [utilisateurid]);
    if (result.length === 1) {
        res.json(result[0]); // Renvoie le commentaire unique trouvé
    } else {
        res.status(404).json({ message: 'utilistateur non trouvé' });
    }
});


  //-------------------------------------------------- COMMENTAIRES ---------------------------------------------------------------------------//

  app.get('/commentaires', async (req, res) => {
    try {
        const sql = 'SELECT * FROM commentaires'; // Remplacez "commentaire" par le nom de votre table de commentaires
        const commentaires = await db.query(sql);
        res.json(commentaires);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des commentaires.' });
    }
});


  app.post('/commentaire', async (req, res) => {
    const { userId, technologieId, contenu } = req.body;
    const date_creation_commentaire = new Date(); 
    const sqlInsert = "INSERT INTO commentaires (userId, technologieId, contenu, date_creation_commentaire) VALUES (?, ?, ?, ?)";

        await db.query(sqlInsert, [userId, technologieId, contenu, date_creation_commentaire]);
        return res.status(201).json({ message: 'Commentaire ajouté avec succès' });
});

app.get('/commentaires/:id', async (req, res) => {
    const commentaireId = req.params.id;
    const sql = 'SELECT * FROM commentaires WHERE id = ?';
    const result = await db.query(sql, [commentaireId]);
    if (result.length === 1) {
        res.json(result[0]); // Renvoie le commentaire unique trouvé
    } else {
        res.status(404).json({ message: 'Commentaire non trouvé' });
    }
});


app.get('/commentaires/:technologieId', async (req, res) => {
    const technologieId = req.params.technologieId;
    const sql = "SELECT * FROM commentaires WHERE technologieId = ?";
        const result = await db.query(sql, [technologieId]);
        return res.json(result);
});

app.get('/commentaires/utilisateur/:userId', async (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM commentaires WHERE userId = ?";
    
        const result = await db.query(sql, [userId]);
        return res.json(result);
});

app.get('/commentaires/date/:date', async (req, res) => {
    const dateParam = req.params.date;
    const sql = "SELECT * FROM commentaires WHERE date_creation_commentaire < ?";
    
        const result = await db.query(sql, [dateParam]);
        return res.json(result);
});


app.post('/technologies', async (req, res) => {
    const { nom_techno } = req.body;
    const sqlInsert = "INSERT INTO technologie (nom_techno) VALUES (?)";
        await db.query(sqlInsert, [nom_techno]);
        return res.status(201).json({ message: 'Technologie ajoutée avec succès' });
});

app.get('/technologie', async (req, res) => {
    try {
        const sql = 'SELECT * FROM technologie'; // Sélectionnez tous les utilisateurs
        const technologie = await db.query(sql);
        res.json(technologie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des technologie.' });
    }
});

app.get('/technologie/:id', async (req, res) => {
    const technologieid= req.params.id;
    const sql = 'SELECT * FROM technologie WHERE id = ?';
    const result = await db.query(sql, [technologieid]);
    if (result.length === 1) {
        res.json(result[0]); // Renvoie le commentaire unique trouvé
    } else {
        res.status(404).json({ message: 'technologie non trouvé' });
    }
});


app.listen(8000, () => 
console.log('Serveur sur le port 8000'));