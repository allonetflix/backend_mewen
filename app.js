const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// BASE DE DONNEES //

    // Postgresql
    const pg = require('pg');

    const client = new pg.Client("postgres://postgres:postgres@localhost/dbtest");

    client.connect( (err) => {

        if(err) throw err;

        console.log("Desormais connecte a la base de donnees");

        client.query('SELECT utilisateur.nom, utilisateur.prenom, utilisateur.age, abonnee.dateInscription FROM myschema.utilisateur, myschema.abonnee WHERE abonnee.fk_idUtilisateur = utilisateur.idUtilisateur;', (err, result) =>{

            if(err) throw err;

            console.log(result.rows[1].nom);

            client.end()
        });
    });
//

// Set static folder
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
//

// ROUTING //
    const routes = require('./routing/routes');
    app.use('/test', routes);
//

// Default Endpoint
app.get('/', (req, res) => {
    res.send("Invalide endpoint !");
});

// Initialisation Serveur
const port = 3000;
app.listen(port, () => {
    console.log('Le serveur a démarré sur le port : ' + port);
});