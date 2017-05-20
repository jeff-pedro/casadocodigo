// app: carrega o objeto do 'express' contído no diretorio 'config' (permite que trate requisições e respostas)
// http: monta um servidor do 'node.js' passando o 'express' configurado
// io: carrega a lib de websocket, recebendo o servidor
var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// configura a variável 'io' para que seja incorporada a todas as rotas
app.set('io', io);

// inicializa o servidor (porta, uma função)
var porta = process.env.PORT || 3000;
var server = http.listen(porta, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Servidor rodando em http://%s:%s', host, port);
});
