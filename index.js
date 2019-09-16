'use strict';
const express = require('express');
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

AppRouting(app, hangmanAPI);

let players = 0;
let users = { playerOne: '', playerTwo: '', spectators: [] };

io.on('connection', socket => {
    socket.on('check', data => {
        if (data !== users.playerOne) {
            if (players < 2) {
                players++;
                if (players === 1) {
                    users.playerOne = data;
                } else if (players === 2) {
                    users.playerTwo = data;
                    socket.emit('lobbyFull', players, users);
                };
            } else {
                users.spectators.push(data);
            }
            socket.emit('checkResponse', { players, users });
        } else {
            socket.emit('checkResponse', 'already connected');
        }
    });
    socket.on('clear', () => {
        players = 0;
        users = { playerOne: '', playerTwo: '', spectators: [] };
    });
});

var PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log('App started on port:', PORT);
});
