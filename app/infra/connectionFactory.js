// importa modulo do mysql
var mysql = require('mysql');

// retorna conexão com o banco de dados
function createDBConnection() {

    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: '',
            database: 'casadocodigo'
        });
    }

    if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: '',
            database: 'casadocodigo_test'
        });
    }

    if (process.env.NODE_ENV == 'production') {

        var url = process.env.CLEARDB_DATABASE_URL;
        var grupos = url.match( /mysql:\/\/(.*):(.*)@(.*)\/(.*)?reconnect=true/);

        return mysql.createConnection({
            host: grupos[3],
            user: grupos[1],
            password: grupos[2],
            database: grupos[4]
        });
    }
}

// exporta como módulo de conexão com o banco
// WRAPPER: função que embrulha a outra, evitando que o 'express-load' o invoque automaticamente
module.exports = function () {
    return createDBConnection;
}
