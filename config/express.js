// require: carrega as bibliotecas/libs
// express: módulo que trabalha com o 'http' de forma simplificada
// express-load: módulo que faz o carreamento dos módulos automaticamente
// body-parser: módulo que congigura o body das requisições no express
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
    // invoca o método do objeto 'express'
    var app = express();

    // informa ao express que são arquivos estáticos (js e css) e podem ser acessados sem uma rota configurada.
    app.use(express.static('./app/public'));
    // configura engine ejs 'motor' que trabalha com os tamplates
    // configura o local onde o diretório 'views' está
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //use: adiciona ao fluxo (pipeline) de execução de requisições do express => middleware
    // middleware - informa ao express  que trate a requisição antes de enviá-la para as rotas
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    // função do 'express-load' que configura as rotas
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    // tem que colocar na ordem, caso contrário ele passa pelo middleware e
    // ainda não vai ter acontecido nenhum erro.
    app.use(function (req, res, next) {
        res.status(404).render('erros/404');
    });

    app.use(function(error, req, res, next){
        // if(process.env.NODE_ENV == 'production') {
        //     res.status(500).render('erros/500');
        //     return;
        // }
        // next(error);
        res.status(500).render('erros/500');
    });

    return app;
}
