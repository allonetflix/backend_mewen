const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const UserTable = require('../models/userSchema');
    
router.post('/register', (req, res) => { // Register
    
    let newUser = new UserTable({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    UserTable.addUser(newUser, (err, userRegistered) => {

        if(err){
            res.json({success: false, msg: "Failed to register user"});
        }
        else{
            res.json({success: true, msg: "User registered"});
        }
    });

});

router.post('/authenticate', (req, res) => { // Authenticate
    
    const usernameSaisi = req.body.username;
    const passwordSaisi = req.body.password;

    UserTable.getUserByUsername(usernameSaisi, (err, userFound) => {

        if(err) throw err;
        if(!userFound){ return res.json({success: false, msg: "User not found "}); }



        UserTable.comparePassword(passwordSaisi, userFound.password, (err, isMatch) => {

            if(err) throw err;
            if(isMatch){ 

                const token = jwt.sign({userFound}, config.secret, { expiresIn: 604800 });
                
                res.json({
                    succes: true,
                    token: 'JWT ' + token,
                    user: {
                        id: userFound._id,
                        name: userFound.name,
                        username: userFound.username,
                        email: userFound.email
                    }
                });
            }

                else{ return res.json({success: false, msg: "Wrong password"}) }
            });
    });
});

router.get('/profil', passport.authenticate('jwt', { session: false }), (req, res) => { // Profil

    res.json({user: req.user });
});

module.exports = router;