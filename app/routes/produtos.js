module.exports = function(app) {

    var listaProdutos = function (req, res, next) {
        // connection: invoca a função que abre conexão com o banco
        // produtosDAO: invoca a função que realiza consulta no banco
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        // invoca a função que realiza uma consulta no banco
        produtosDAO.lista(function(err, results) {
            if (err) {
                return next(err);
            }
            res.format({
                html : function () {
                    res.render('produtos/lista', {lista: results});
                },
                json : function () {
                    res.json(results);
                }
            });
        });
        // fecha conexão
        connection.end();
    }

    // get: trata as requisições
    // recebe (diretório, função (request, response))
    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form',{errosValidacao:{}, produto:{}});
    });

    // controller: cadastro de produtos
    app.post('/produtos', function(req, res, next) {
        // body: atributo que guarda o corpo da requição
        var produto = req.body;
        // valida dados do fomulário
        req.assert('titulo','Título é obrigatório').notEmpty();
        req.assert('preco','Formato é obrigatório').isFloat();

        var erros = req.validationErrors();
        if (erros) {
            res.format({
                html : function () {
                    res.status(400).render('produtos/form', {errosValidacao:erros, produto:produto});
                },
                json : function () {
                    res.status(400).json(erros);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, function(err, results) {
            if (err) {
                return next(err);
            }
            res.redirect('/produtos');
        });

        connection.end();
    });
}
