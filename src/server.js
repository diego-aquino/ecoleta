const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db");

// configurando a pasta pública
server.use(express.static("public"));

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extend: true }));

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
    // req.query contém os dados da requisição depois do ? na url

    return res.render("create-point.html");
});

server.post("/save-point", (req, res) => {
    // req.body contém os dados vindos do formulário

    // inserir os dados no banco de dados
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;

    let values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    if (parseInt(req.body.address2)) {
        values[3] = `N° ${req.body.address2}`;
    }

    function afterInsert(err) {
        if (err) {
            console.log(err);
            return res.send("Algo deu errado :( </br></br> Cadastro não realizado.");
        }

        return res.render("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsert);
});

// search results page
server.get("/search", (req, res) => {
    const search = req.query.search;

    if (!search) {
        return res.render("search-results.html", { total: 0 });
    }

    // (as porcentagens signigicam qualquer coisa antes e qualquer coisa depois do ${search})
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) { return console.log(err); }

        const total = rows.length;

        return res.render("search-results.html", { places: rows, total });
    });
});

// ligando o servidor na porta 3000
server.listen(3000);
