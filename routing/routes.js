const express       = require('express');
const router        = express.Router();
const passport      = require('passport');
const jwt           = require('jsonwebtoken');

const param         = require('../config/parameters');
const insertQuery   = require('../queries/insert');
const selectQuery   = require('../queries/select');
        

router.post('/register', (req, res) => { // Register
    
    const newUser = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
        lastName: req.body.lastName
    }

    selectQuery.selectUserByPseudo(newUser.pseudo, (err, userFound) => { // check if pseudo exists

        if(err) throw err;
        if(userFound[0]){ return res.json({success: false, msg: "Pseudo already exists !"}); }

        insertQuery.insertUser(newUser, (err, userAdded) => { // insert newUser

            if(err)
                res.json({success: false, msg: "Echec de l'inscription"});
            else
                res.json({success: true, msg: "Inscription réussie"});
        });  
    });
});

router.post('/authenticate', (req, res) => { // Authenticate
    
    const pseudoEntered = req.body.pseudo;
    const pwdEntered = req.body.password;

    selectQuery.selectUserByPseudo(pseudoEntered, (err, userFound) => { // check if user exists

        if(err) throw err;
        if(!userFound){ return res.json({success: false, msg: "User not found !"}); }
       
        selectQuery.comparePassword(pwdEntered, userFound[0].password, (err, isMatch) => { // compare password

            if(err) throw err;
            if(isMatch){ 

                const token = jwt.sign(userFound[0], param.secret, { expiresIn: 60 * 60 });
                
                res.json({
                    succes: true,
                    token: 'JWT ' + token,
                    user: {
                        id: userFound[0].iduser,
                        pseudo: userFound[0].pseudo,
                        email: userFound[0].email,
                        lastname: userFound[0].lastname
                    }
                });
            }

            else{ return res.json({success: false, msg: "Wrong password"}) }
        });
    });
});

router.get('/profil', passport.authenticate('jwt', { session: false }), (req, res) => { // Profil

    res.json({userData: req.user });
});

module.exports = router;