const cors          = require('cors');
const path          = require('path');
const express       = require('express');
const passport      = require('passport');
const bodyParser    = require('body-parser');

const config        = require('./config/configuration');
const db            = require('./middlewares/connection');

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

    require('./middlewares/passport')(passport);


// ROUTING //

    const routeUser     = require('./routing/routeUser');
    const routeArticle  = require('./routing/routeArticle');
    app.use('', routeUser);
    app.use('', routeArticle);


// SERVER //

    app.listen(config.port, (err) => {

        if (err) throw err;
        console.log('Le serveur a démarré sur le port : ' + config.port);
    });