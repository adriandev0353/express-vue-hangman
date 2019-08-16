/* eslint-disable no-undef */
'use strict';
const assert = require('assert');
const HangmanService = require('../hangman-service');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/hangman_test';

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const pool = new Pool({
    connectionString,
    ssl: useSSL
});

describe('Testing waiter shifts manager', function () {
    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from shifts;');
        await pool.query('delete from waiter;');
    });
});

after(function () {
    pool.end();
});
