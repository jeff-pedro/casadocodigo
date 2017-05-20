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
}

// exporta como módulo de conexão com o banco
// WRAPPER: função que embrulha a outra, evitando que o 'express-load' o invoque automaticamente
module.exports = function () {
    return createDBConnection;
}
