const bcrypt        = require('bcryptjs');

const db        	= require('../config/connection');


module.exports.insertUser = (newUser, callback) =>{

    bcrypt.genSalt(10, (err, salt) => { 

        bcrypt.hash(newUser.password, salt, (err, passwordHashed) => {

            newUser.password = passwordHashed;

            const queryText = 'INSERT INTO schema.user (pseudo, email, password, lastName) VALUES ($1, $2, $3, $4);';
            const queryValues = [newUser.pseudo, newUser.email, newUser.password, newUser.lastName];

            db.connectionPsql(queryText, queryValues, callback);
        });
    });
}