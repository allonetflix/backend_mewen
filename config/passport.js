const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserTable = require('../models/userSchema');
const config = require('../config/database');

module.exports = function(passport){

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        UserTable.findById(jwt_payload.userFound._id, (err, userFound) => {

            if(err){ return done(err, false); }

            if(userFound){ return done(null, userFound); }

            else{ return done(null, false); }

        });

    }));

}