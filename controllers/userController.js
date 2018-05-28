const insertQuery   = require('../queries/insert');
const selectQuery   = require('../queries/select');


module.exports.registerUser = (req, res) => {

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
}