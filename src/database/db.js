// importar a dependência do SQLite3
const sqlite3 = require("sqlite3").verbose();
// .verbose() -> enviar mensagens para o terminal quando algo acontecer

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;


// notas
function examples() {
    // operações
    db.serialize(() => {
        // com comandos SQL...
        createTableIfNotExists();

        // insert();
        // remove();
        select();
    });

    function createTableIfNotExists() {
        // criar uma tabela
        db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                image TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );
        `);
    }

    function insert() {
        // inserir dados na tabela
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

        const values = [
            "Papersider",
            "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
            "Guilherme Gemballa, Jardim América",
            "Nº 260",
            "Santa Catarina",
            "Rio do Sul",
            "Papéis e Papelão"
        ];

        function afterInsert(err) {
            if (err) { return console.log(err); }

            console.log("Register added successfully");
            console.log(this);
        }

        db.run(query, values, afterInsert);
    }

    function select() {
        // consultar dados da tabela
        db.all(`SELECT * FROM places`, function(err, rows) {
            if (err) { return console.log(err); }

            console.log("Registers: ");
            console.log(rows);
        });
    }

    function remove() {
        // deletar dados da tabela

        for (let id of [11, 12, 13]) {
            db.run(`DELETE FROM places WHERE id=?`, [id], function(err) {
                if (err) { return console.log(err); }

                console.log(`Register with id ${id} deleted successfully`);
            });
        }
    }
}
