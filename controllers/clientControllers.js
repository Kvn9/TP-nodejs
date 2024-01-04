const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.getAllClient = async(req, res)=> {
    const sql = "SELECT * from client";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}

exports.register = async(req, res)=> {
    // vérifier l'email de l'utilisateur
    const { email, password } = req.body 
    const result = await db.query('select * from client where email = ?', [email])
    if(result.length > 0){
        return res.status(401).json({error: "utilisateur déjà existant"})
    }
    // utilisez bcrypt pour hasher le mdp
    const hashMDP = await bcrypt.hash(password, 10);
    // envoyer les infos (email, mdp hasher) en bdd

    await db.query('INSERT INTO client (email, password) VALUES (?, ?)',
    [email, hashMDP]
    )
    // renvoie jwt token pour la signature
    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn : '1h'})
    res.json({token})
}

exports.login = async(req, res)=> {
    // vérifier l'email de l'utilisateur => récupérer le mdp
    const { email, password } = req.body 
    const result = await db.query('select * from client where email = ?', [email])
    if(result.length == 0){
        return res.status(401).json({error: "utilisateur non existant"})
    }
    const client = result[0];
    console.log(client);
    // comparaison du mdp avec le mdp hasher en bdd avec bcrypt
    const SamePwd = await bcrypt.compare(password, client.password)
    if(!SamePwd){
        return res.status(401).json({error: "mdp incorrect"})
    }
    // renvoie jwt token pour la signature
    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn : '1h'})
    res.json({token})
}

