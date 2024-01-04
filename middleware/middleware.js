const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../database/database'); // Assurez-vous du chemin correct


// exports.authenticator = (req, res, next) =>{
//     // récupérer le token
//     const token = req.params.token ? req.params.token : req.headers.authorization
//     if(token && process.env.SECRET_KEY){
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
//             // si problème => erreur
//             if(err){
//                 res.status(401).json({erreur: "accès refusé"})
//             }
//             // décoder => next()
//             else{
//                 console.log(decoded);
//                 const result = db.query('select role FROM client where email = ?', [decoded.email])
//                 if(result.length === 1 && result[0].role == 1){
//                     next()
//             }
//         }
//         })
//     }else{
//         res.status(401).json({erreur: "accès refusé"})
//     }
// }

exports.authenticator = (req, res, next) => {
    // récupérer le token
    const token = req.params.token ? req.params.token : req.headers.authorization;
    if (token && process.env.SECRET_KEY) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // si problème => erreur
            if (err) {
                res.status(401).json({ erreur: "accès refusé" });
            }
            // décoder => next()
            else {
                console.log(decoded);

                // Ajoutez cette partie pour stocker le token dans le localStorage
                if (decoded && decoded.token) {
                    localStorage.setItem('jwtToken', decoded.token);
                }

                const result = db.query('select role FROM client where email = ?', [decoded.email])
                if (result.length === 1 && result[0].role == 1) {
                    next()
                }
            }
        })
    } else {
        res.status(401).json({ erreur: "accès refusé" });
    }
}


exports.checkRole = (roles) => {
    return (req, res, next) => {
        const token = req.params.token ? req.params.token : req.headers.authorization;
        if (token && process.env.SECRET_KEY) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ erreur: "Accès refusé" });
                } else {
                    const userRole = decoded.role;                   
                    if (roles.includes(userRole)) {
                        next();
                    } else {
                        return res.status(403).json({ erreur: "Accès interdit" });
                    }
                }
            });
        } else {
            return res.status(401).json({ erreur: "Accès refusé" });
        }
    };
};




// // Middleware pour vérifier si l'utilisateur est administrateur
// exports.Admin = async (req, res, next) => {
//   console.log('req.user:', req.user); 
//   const userId = req.user.id; 
//   const sql = 'SELECT role FROM utilisateur WHERE id = ?';

//   try {
//     const user = await db.query(sql, [userId]);
//     if (user.length === 1 && user[0].role === 'administrateur') {
//       return next();
//     }
//     return res.status(403).json({ message: 'Accès interdit' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Erreur serveur' });
//   }
// };

// // Nouvelle fonction de middleware pour vérifier si l'utilisateur est administrateur
// exports.checkAdminRole = (req, res, next) => {
//     const token = req.params.token ? req.params.token : req.headers.authorization;
//     if (token && process.env.SECRET_KEY) {
//         jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ erreur: "Accès refusé" });
//             } else {
//                 console.log(decoded);
//                 const role = decoded.role;
//                 if (role === 'administrateur') {
//                     next();
//                 } else {
//                     return res.status(403).json({ erreur: "Accès interdit : seuls les administrateurs peuvent effectuer cette action." });
//                 }
//             }
//         });
//     } else {
//         return res.status(401).json({ erreur: "Accès refusé" });
//     }
// };

