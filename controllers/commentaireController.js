const db = require('../database/database')
require('dotenv').config()

exports.getAllCommentaire = async(req, res)=> {
    const sql = 'SELECT * FROM commentaires'; 
    const commentaires = await db.query(sql);
    res.json(commentaires); 
}


exports.insertCommentaire = async (req, res) => {
    const { userId, technologieId, contenu } = req.body;
    const date_creation_commentaire = new Date();

    // Vérifier si l'utilisateur a le rôle requis (journaliste ou administrateur) pour insérer un commentaire
    if (req.user && (req.user.role === 'journaliste' || req.user.role === 'administrateur')) {
        const sqlInsert = "INSERT INTO commentaires (userId, technologieId, contenu, date_creation_commentaire) VALUES (?, ?, ?, ?)";
        await db.query(sqlInsert, [userId, technologieId, contenu, date_creation_commentaire]);
        return res.status(201).json({ message: 'Commentaire ajouté avec succès' });
    } else {
        return res.status(403).json({ message: 'Accès non autorisé' });
    }
};

exports.getCommentaireID = async (req, res) => {
    const commentaireId = req.params.id;
    const sql = 'SELECT * FROM commentaires WHERE id = ?';
    const result = await db.query(sql, [commentaireId]);
    if (result.length === 1) {
        res.json(result[0]); // Renvoie le commentaire unique trouvé
    } else {
        res.status(404).json({ message: 'Commentaire non trouvé' });
    }
};

exports.getCommentaireTechnologieID =  async (req, res) => {
    const technologieId = req.params.technologieId;
    const sql = "SELECT * FROM commentaires WHERE technologieId = ?";
        const result = await db.query(sql, [technologieId]);
        return res.json(result);
};

exports.getCommentaireUserID = async (req, res) => { 
    const userId = req.params.userId;
    const sql = "SELECT * FROM commentaires WHERE userId = ?";
        const result = await db.query(sql, [userId]);
        return res.json(result);
};

exports.getCommentaireDate = async (req, res) => {
    const dateParam = req.params.date;
    const sql = "SELECT * FROM commentaires WHERE date_creation_commentaire < ?";
        const result = await db.query(sql, [dateParam]);
        return res.json(result);
}