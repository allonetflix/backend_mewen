const cors          = require('cors');
const path          = require('path');
const express       = require('express');
const passport      = require('passport');
const bodyParser    = require('body-parser');

const db            = require('./config/connection');
const param         = require('./config/parameters');

const app           = express();


// STATIC FOLDER //

    app.use(express.static(path.join(__dirname, 'public')));


// MIDDLEWARES //

    // Cors
    app.use(cors());

    // Body-Parser
    app.use(bodyParser.json());

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());

    require('./config/passport')(passport);


// ROUTING //

    const routes = require('./routing/routes');
    app.use('', routes);


// SERVER //

    app.listen(param.port, (err) => {

        if (err) throw err;
        console.log('Le serveur a démarré sur le port : ' + param.port);
    });



// (A conserver) Base test psql : 

    // const queryText = 'SELECT * FROM schema.user;';

    // db.connectionPsql(queryText);


    // const queryText = 'SELECT * FROM schema.user WHERE schema.user.idUser = $1;';
    // const queryValues = ['1'];

    // db.connectionPsql(queryText, queryValues);