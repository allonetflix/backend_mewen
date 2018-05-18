const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema 
const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const UserTable = mongoose.model('User', UserSchema);
module.exports = UserTable;

// Functions //

module.exports.addUser = function(newUser, callback){  
    
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(newUser.password, salt, (err, passwordHashed) => {

            newUser.password = passwordHashed;

            newUser.save(callback);
            
        });
    });
}

module.exports.getUserByIde = function(id, callback) {
    UserTable.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){  
    UserTable.findOne({username:username}, callback);
}

module.exports.comparePassword = function(passwordSaisi, hash, callback){

    bcrypt.compare(passwordSaisi, hash, (err, isMatch) => {

        if(err) throw err;
        callback(null, isMatch);
    });
}