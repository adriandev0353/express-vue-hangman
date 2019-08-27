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

describe('Testing hangman game', () => {
    // eslint-disable-next-line no-undef
    beforeEach(async () => {
        // clean the tables before each test run
        await pool.query('delete from word_list;');
        await pool.query('delete from user_data;');
        await pool.query('delete from table_link;');
    });
    describe('testing database manipulation', () => {
        it('Should return a list of 3 words with their id and length', async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);

            assert.strict.deepEqual(await hangmanInstance.allWords(), [
                { id: 1, word: 'house', word_length: 5 },
                { id: 2, word: 'car', word_length: 3 },
                { id: 3, word: 'plane', word_length: 5 }
            ]);
        });
        it('Should return a list of 3 words with their id and length, clearing previous data', async () => {
            const hangmanInstance = HangmanService(pool);

            for (let x = 0; x < 4; x++) {
                const data = [
                    x + 1,
                    'test',
                    4
                ];

                await pool.query('INSERT INTO word_list(id, word, word_length) VALUES($1,$2,$3)', data);
            };

            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);

            assert.strict.deepEqual(await hangmanInstance.allWords(), [
                { id: 1, word: 'house', word_length: 5 },
                { id: 2, word: 'car', word_length: 3 },
                { id: 3, word: 'plane', word_length: 5 }
            ]);
        });
        it('Should return a list of words with the length of 5', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);
            const list = await hangmanInstance.listWordOfSize(5);
            assert.strict.deepEqual(list, [
                { id: 1, word: 'house', word_length: 5 },
                { id: 3, word: 'plane', word_length: 5 }
            ]);
        });
        it('Should return a message that the word added successfully', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);
            const message = await hangmanInstance.addNewWord('motorbike');
            const list = await hangmanInstance.allWords();

            assert.strict.deepEqual(message, 'success');
            assert.strict.deepEqual(list, [
                { id: 1, word: 'house', word_length: 5 },
                { id: 2, word: 'car', word_length: 3 },
                { id: 3, word: 'plane', word_length: 5 },
                { id: 4, word: 'motorbike', word_length: 9 }
            ]);
        });
        it('Should return an error message that the word already exists', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);
            const message = await hangmanInstance.addNewWord('car');
            assert.strict.deepEqual(message, 'This word already exists in our database');
        });
        it("Should return a list of words, the new word shouldn't add as it already exists", async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);
            await hangmanInstance.addNewWord('house');
            const list = await hangmanInstance.allWords();
            assert.strict.deepEqual(list, [
                { id: 1, word: 'house', word_length: 5 },
                { id: 2, word: 'car', word_length: 3 },
                { id: 3, word: 'plane', word_length: 5 }
            ]);
        });
        it("Should return a list of users, 'dyllanhope' being the only one as it was added", async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.addUser('dyllanhope', '123');

            const list = await hangmanInstance.allUsers();
            assert.strict.deepEqual(list, [
                { id: 1, username: 'dyllanhope', password: '123', points: 0 }
            ]);
        });
        it("Should return a list of users, 'dyllanhope' being the only one as it was added, even though a it was attempted to add again", async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('dyllanhope', '123');

            const list = await hangmanInstance.allUsers();
            assert.strict.deepEqual(list, [
                { id: 1, username: 'dyllanhope', password: '123', points: 0 }
            ]);
        });
        it("Should return a list of users, 'dyllanhope', with updated points", async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addWordTo('dyllanhope', 'Aeroplane', 'won');

            const list = await hangmanInstance.allUsers();
            assert.strict.deepEqual(list, [
                { id: 1, username: 'dyllanhope', password: '123', points: 9 }
            ]);
        });

        it("Should return a list of words that the user 'dyllanhope' has played along with whether he lost or won", async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addWordTo('dyllanhope', 'plane', 'won');
            await hangmanInstance.addWordTo('dyllanhope', 'house', 'lost');
            await hangmanInstance.addWordTo('michael', 'house', 'won');

            const data = await hangmanInstance.personalData('dyllanhope');
            assert.strict.deepEqual(data, [
                { id: 1, username: 'dyllanhope', word: 'plane', complete_state: 'won', points: 5 },
                { id: 2, username: 'dyllanhope', word: 'house', complete_state: 'lost', points: -2 }]
            );
        });
    });
});

// eslint-disable-next-line no-undef
after(() => {
    pool.end();
});
