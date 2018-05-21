const { Client }    = require('pg');

const param         = require('./parameters')


module.exports.connectionPsql = (queryText, queryValues, callback) => {

    const client        = new Client("postgres://" + param.psql.user 
                        + ":" + param.psql.password 
                        + "@" + param.psql.host 
                        + "/" + param.psql.database);

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