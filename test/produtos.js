// mocha: lib em modo script que realiza testes
// superest: módulo que integra com  'mocha' para facilitar a execução de testes

var express = require('../config/express')();
var request = require('supertest')(express);

//***********PESQUISAR lib node-database-cleaner***************

// describe: recebe os testes
describe('ProdutosController', function () {

    //beforeEach: função do 'mocha' que executa algo antes de cada caso de teste 'it'
    beforeEach(function (done) {
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos', function (err, result) {
            if (!err) {
                done();
            }
        });
    });

    // it: executa este teste.
    // necessário argumento 'done' que indica quando disparar o teste
    it('#listagem de produtos json', function (done) {
        // get: função que recebe a requisição, tendo como parâmetro uma 'rota'
        // set: configura o tipo de reuisição
        // expect: configura o tipo de resposta que esperamos receber
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
    });

    it('#listagem de produtos html', function (done) {
        request.get('/produtos')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });

    it('#cadastro de produtos com dados inválidos json', function (done) {
        request.post('/produtos')
        .set('Accept', 'application/json')
        .send({tituto:'', preco:100})
        .expect(400, done);
    });

    it('#cadastro de produtos com dados inválidos html', function (done) {
        request.post('/produtos')
        .set('Accept', 'text/html')
        .send({titulo:'', preco:100})
        .expect(400, done);
    });

    it('#cadastro de produtos com dados válidos', function (done) {
        request.post('/produtos')
        .send({titulo:'testando com node', preco: 250, descricao:' testes application'})
        .expect(302, done);
    });
});
