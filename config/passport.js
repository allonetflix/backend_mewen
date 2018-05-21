const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;

const param         = require('./parameters');
const selectQuery   = require('../queries/select');


module.exports = (passport) => {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = param.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        selectQuery.selectUserById(jwt_payload.iduser, (err, userFound) => {

            if(err){ return done(err, false); }

            if(userFound){ return done(null, userFound); }

            else{ return done(null, false); }
        });
    }));
}