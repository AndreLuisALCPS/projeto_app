const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));


const db = new sqlite3.Database('./src/db.js');

app.get('/', (req, res) => {
    res.send('Página inicial');
});


app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
