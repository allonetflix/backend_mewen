const { Client }    = require('pg');

const config        = require('../config/configuration');


module.exports.connectionPsql = (queryText, queryValues, callback) => {

    const client        = new Client("postgres://" + config.psql.user 
                        + ":" + config.psql.password 
                        + "@" + config.psql.host 
                        + "/" + config.psql.database);

    client.connect((err, client, done) => {

        if(err) throw callback(err);
 
        client.query( queryText, queryValues, (err, result) =>{

            if(err) throw callback(err);

            client.end();

            // console.log(result.rows);
            // console.log(result.rows[0].pseudo);
            return callback(null,result.rows);   
        });        
    });
}