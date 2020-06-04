const express = require("express");
const server = express();

// configurando a pasta pública
server.use(express.static("public"));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

// configurar rotas da aplicação
// home page
server.get("/", (req, res) => {
    // renderizando pelo motor no nunjucks
    return res.render("index.html", {
        // dados para serem usados pelo nunjucks
        // (no estilo objeto)
    });
});

// create point page
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

// search results page
server.get("/search", (req, res) => {
    return res.render("search-results.html");
});

// ligando o servidor na porta 3000
server.listen(3000);
