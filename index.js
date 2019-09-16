'use strict';
const express = require('express')();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const wordList = require('./word.json');
const HangmanAPI = require('./hangman-api');
const HangmanService = require('./hangman-service');
const AppRouting = require('./app-routing');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());

const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/hangman';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const hangmanService = HangmanService(pool);
const hangmanAPI = HangmanAPI(hangmanService);

const handlebarSetup = exphbs({
    partialsDir: './views',
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.RELOAD_DATA) {
    console.log('About to reload data');
    hangmanService.reloadData(wordList);
} else {
    console.log('Data not reloaded');
};

io.on('connection', socket => {
    console.log('User connected');
});

AppRouting(app, hangmanAPI);

var PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log('App started on port:', PORT);
});
