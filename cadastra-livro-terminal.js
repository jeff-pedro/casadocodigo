// simula um solictiação de cadastro de livro pelo cliente
var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept' : 'application/json',
        'Content-type':'application/json'
    }
};

var client = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('Corpo: ' + body);
    });
});

var produto = {
    titulo : 'livro sobre node',
    descricao : 'descricao sobre livro de json',
    preco : '100'
}

client.end(JSON.stringify(produto));
