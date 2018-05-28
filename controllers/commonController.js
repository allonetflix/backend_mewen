const jwt           = require('jsonwebtoken');

const selectQuery   = require('../queries/select');
const config        = require('../config/configuration');


module.exports.authenticationUser = (req, res) => {

	const pseudoEntered = req.body.pseudo;
    const pwdEntered = req.body.password;

    selectQuery.selectUserByPseudo(pseudoEntered, (err, userFound) => { // check if user exists

        if(err) throw err;
        if(!userFound){ return res.json({success: false, msg: "User not found !"}); }
       
        selectQuery.comparePassword(pwdEntered, userFound[0].password, (err, isMatch) => { // compare password

            if(err) throw err;
            if(isMatch){ 

                const token = jwt.sign(userFound[0], config.secret, { expiresIn: 60 * 60 });
                
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
}