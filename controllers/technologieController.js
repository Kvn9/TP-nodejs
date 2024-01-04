const db = require('../database/database')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.insertTechnologie = async (req, res) => {
        const { nom_techno } = req.body;
        const sqlInsert = "INSERT INTO technologie (nom_techno) VALUES (?)";
            await db.query(sqlInsert, [nom_techno]);
            return res.status(201).json({ message: 'Technologie ajoutée avec succès' });
    };

exports.getAllTechnologie = async (req, res) => {
        const sql = 'SELECT * FROM technologie';
        const technologie = await db.query(sql);
        res.json(technologie);
};

exports.getTechnologieID = async (req, res) => {
    const technologieid= req.params.id;
    const sql = 'SELECT * FROM technologie WHERE id = ?';
    const result = await db.query(sql, [technologieid]);
    if (result.length === 1) {
        res.json(result[0]); // Renvoie le commentaire unique trouvé
    } else {
        res.status(404).json({ message: 'technologie non trouvé' });
    }
};

exports.getTechnologieUser = async (req, res) => {
    async (req, res) => {
            const sql = 'SELECT * FROM technologie'; // Sélectionnez tous les utilisateurs
            const technologie = await db.query(sql);
            res.json(technologie);  
}};

exports.deleteTechnologie = async (req, res) => {
    const technologieid = req.params.id;
    const sql = 'DELETE FROM technologie WHERE id = ?';
    await db.query(sql, [technologieid]);
    res.status(204).json({ message: 'Technologie supprimée avec succès' });
};

exports.updateTechnologie = async (req, res) => {
    const technologieid = req.params.id;
    const { nom_techno } = req.body;
    const sql = 'UPDATE technologie SET nom_techno = ? WHERE id = ?';
    await db.query(sql, [nom_techno, technologieid]);
    res.status(200).json({ message: 'Technologie modifiée avec succès' });
}