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
        await pool.query('delete from new_words;');
        await pool.query('delete from friend_link;');
        await pool.query('delete from user_challenges;');
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
                { word: 'house', word_length: 5 },
                { word: 'car', word_length: 3 },
                { word: 'plane', word_length: 5 }
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
                { word: 'house', word_length: 5 },
                { word: 'car', word_length: 3 },
                { word: 'plane', word_length: 5 }
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
                { word: 'house', word_length: 5 },
                { word: 'plane', word_length: 5 }
            ]);
        });
        it('Should return a message that the word added successfully', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addNewWord('motorbike', 'dyllanhope');
            const list = await hangmanInstance.allWords();

            assert.strict.deepEqual(list, [
                { word: 'house', word_length: 5 },
                { word: 'car', word_length: 3 },
                { word: 'plane', word_length: 5 },
                { word: 'motorbike', word_length: 9 }
            ]);
        });
        it('Should return an error message that the word already exists', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane'
            ]);
            await hangmanInstance.addNewWord('car');
            const words = await pool.query('SELECT * FROM word_list');
            const list = [];
            for (const item of words.rows) {
                list.push(item.word);
            }
            assert.strict.deepEqual(list, [
                'house', 'car', 'plane'
            ]);
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
                { word: 'house', word_length: 5 },
                { word: 'car', word_length: 3 },
                { word: 'plane', word_length: 5 }
            ]);
        });
        it("Should return a list of users, 'dyllanhope' being the only one as it was added", async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.addUser('dyllanhope', '123');

            const list = await hangmanInstance.allUsers();
            assert.strict.deepEqual(list, [
                { username: 'dyllanhope', password: '123', points: 0, win_rate: 0, friends: null }
            ]);
        });
        it("Should return a list of users, 'dyllanhope' being the only one as it was added, even though a it was attempted to add again", async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('dyllanhope', '123');

            const list = await hangmanInstance.allUsers();
            assert.strict.deepEqual(list, [
                { username: 'dyllanhope', password: '123', points: 0, win_rate: 0, friends: null }
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
                { username: 'dyllanhope', password: '123', points: 9, win_rate: 100, friends: null }
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
                { username: 'dyllanhope', word: 'plane', complete_state: 'won', points: 5 },
                { username: 'dyllanhope', word: 'house', complete_state: 'lost', points: -3 }]
            );
        });
        it('Should return a list of words that all users that have played and whether they have lost or won', async () => {
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

            const data = await hangmanInstance.linkTableData();
            assert.strict.deepEqual(data, [
                { username: 'dyllanhope', word: 'plane', complete_state: 'won', points: 5 },
                { username: 'dyllanhope', word: 'house', complete_state: 'lost', points: -3 }]
            );
        });
        it('Should return dyllanhopes user data', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            assert.strict.deepEqual(await hangmanInstance.findUser('dyllanhope'), [{ username: 'dyllanhope', password: '123', points: 0, win_rate: 0, friends: null }]);
        });
        it('Should return michaels data with his points remaining zero after losing points', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addWordTo('michael', 'car', 'lost');
            const result = await pool.query('SELECT username,password,points,win_rate,friends FROM user_data WHERE username = $1', ['michael']);

            assert.strict.deepEqual(result.rows[0],
                { username: 'michael', password: '123', points: 0, win_rate: 0, friends: null });
        });
        it('Should return dyllanhopes password', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            assert.strict.deepEqual(await hangmanInstance.loginCheck('dyllanhope'), '123');
        });
        it('Should return that the user was "not found"', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            assert.strict.deepEqual(await hangmanInstance.loginCheck('John'), 'Not found');
        });
        it('Should return that dyllanhope already exists', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            assert.strict.deepEqual(await hangmanInstance.userCheck('dyllanhope'), 'already exists');
        });
        it('Should return that johndoe is a new account', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            assert.strict.deepEqual(await hangmanInstance.userCheck('johndoe'), 'new account');
        });
        it('Should return a list of new words pending for confirmation', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.storeNewWord('select', 'dyllanhope');
            await hangmanInstance.storeNewWord('jewellery', 'michael');
            assert.strict.deepEqual(await hangmanInstance.newWordList(), [
                {
                    word: 'select',
                    username: 'dyllanhope',
                    status: 'pending'
                },
                {
                    word: 'jewellery',
                    username: 'michael',
                    status: 'pending'
                }]
            );
        });
        it('Should return that the words "plane" and select already exist and "machine" is new', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.storeNewWord('select', 'dyllanhope');
            await hangmanInstance.storeNewWord('jewellery', 'michael');

            let wordTest = await hangmanInstance.checkWord('plane');
            assert.strict.equal(wordTest, 'exists');
            wordTest = await hangmanInstance.checkWord('select');
            assert.strict.equal(wordTest, 'exists');
            wordTest = await hangmanInstance.checkWord('machine');
            assert.strict.equal(wordTest, 'new');
        });
        it('Should return that the words "plane" and select already exist and "machine" is new', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addWordTo('dyllanhope', 'Aeroplane', 'won');
            await hangmanInstance.addWordTo('dyllanhope', 'car', 'lost');

            assert.strict.deepEqual(await hangmanInstance.choiceFilter('dyllanhope', 'lost'), [
                {
                    username: 'dyllanhope',
                    word: 'car',
                    complete_state: 'lost',
                    points: -2
                }]
            );
        });
        it('Should return a list of users after dyllanhope was deleted from the table', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.delUser('dyllanhope');

            assert.strict.deepEqual(await hangmanInstance.allUsers(), [{ username: 'michael', password: '123', points: 0, win_rate: 0, friends: null }]);
        });
        it('Should return that the words "plane" and select already exist and "machine" is new', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.storeNewWord('select', 'dyllanhope');
            await hangmanInstance.storeNewWord('jewellery', 'michael');

            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);

            assert.strict.deepEqual(await hangmanInstance.allWords(), [
                { word: 'house', word_length: 5 },
                { word: 'car', word_length: 3 },
                { word: 'plane', word_length: 5 },
                { word: 'Aeroplane', word_length: 9 },
                { word: 'select', word_length: 6 },
                { word: 'jewellery', word_length: 9 }]
            );
        });
        it('Should return that the words "plane" and select already exist and "machine" is new', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.storeNewWord('select', 'dyllanhope');
            await hangmanInstance.storeNewWord('jewellery', 'michael');

            await hangmanInstance.setNewWordStatus('select', 'deny');
            await hangmanInstance.setNewWordStatus('jewellery', 'confirmed');

            assert.strict.deepEqual(await hangmanInstance.newWordList(), [
                {
                    word: 'jewellery',
                    username: 'michael',
                    status: 'confirmed'
                }
            ]);
        });
        it('Should return that the word "house" has been played before', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addWordTo('dyllanhope', 'house', 'won');
            assert.strict.equal(await hangmanInstance.checkWordsGuessed('dyllanhope', 'house'), 'found');
        });
        it('Should return that the word "house" has never been played before', async () => {
            const hangmanInstance = HangmanService(pool);
            await hangmanInstance.reloadData([
                'house',
                'car',
                'plane',
                'Aeroplane'
            ]);
            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            assert.strict.equal(await hangmanInstance.checkWordsGuessed('dyllanhope', 'house'), 'not found');
        });
        it('Should return that michael has sent a pending friend request to dyllan', async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            const status = await hangmanInstance.addFriends('michael', 'dyllanhope');

            const requests = await hangmanInstance.returnFriendRequests('dyllanhope');
            assert.strict.deepEqual(requests, [
                {
                    requester: 'michael',
                    receiver: 'dyllanhope',
                    status: 'pending'
                }]
            );
            assert.strict.equal(status, 'success');
        });
        it("Should return that a record of john's friends doesn't exist", async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addFriends('michael', 'dyllanhope');
            const status = await hangmanInstance.addFriends('michael', 'dyllanhope');

            const requests = await hangmanInstance.returnFriendRequests('john');
            assert.strict.deepEqual(requests, 'none'
            );
            assert.strict.equal(status, 'exists');
        });
        it("Should return that michael's request was confirmed by dyllan", async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addFriends('michael', 'dyllanhope');
            await hangmanInstance.confirmRequest('michael', 'dyllanhope');

            const friends = await hangmanInstance.friendList('dyllanhope');

            assert.strict.deepEqual(friends, ['michael']);
        });
        it("Should return that michael and john's requests were confirmed by dyllan", async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');
            await hangmanInstance.addUser('john', '123');
            await hangmanInstance.addUser('janey', '123');

            await hangmanInstance.addFriends('michael', 'dyllanhope');
            await hangmanInstance.addFriends('john', 'dyllanhope');
            await hangmanInstance.addFriends('john', 'michael');

            await hangmanInstance.confirmRequest('michael', 'dyllanhope');
            await hangmanInstance.confirmRequest('john', 'dyllanhope');
            await hangmanInstance.confirmRequest('john', 'michael');

            const friends = await hangmanInstance.friendList('dyllanhope');

            assert.strict.equal(await hangmanInstance.friendList('janey'), 'none');
            assert.strict.deepEqual(friends, ['michael', 'john']);
        });
        it("Should return that michael's request was denied by dyllan", async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');
            await hangmanInstance.addUser('john', '123');
            await hangmanInstance.addUser('janey', '123');

            await hangmanInstance.addFriends('michael', 'dyllanhope');
            await hangmanInstance.addFriends('john', 'dyllanhope');
            await hangmanInstance.addFriends('john', 'michael');

            await hangmanInstance.denyRequest('michael', 'dyllanhope');
            await hangmanInstance.confirmRequest('john', 'dyllanhope');
            await hangmanInstance.confirmRequest('john', 'michael');

            let requests = await pool.query('SELECT requester, receiver, status FROM friend_link');
            requests = requests.rows;

            assert.strict.deepEqual(requests, [
                { requester: 'john', receiver: 'dyllanhope', status: 'confirmed' },
                { requester: 'john', receiver: 'michael', status: 'confirmed' }]);
        });
        it("Should return that john was deleted from michael's friends list", async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');
            await hangmanInstance.addUser('john', '123');
            await hangmanInstance.addUser('janey', '123');

            await hangmanInstance.addFriends('michael', 'dyllanhope');
            await hangmanInstance.addFriends('michael', 'janey');
            await hangmanInstance.addFriends('john', 'dyllanhope');
            await hangmanInstance.addFriends('john', 'michael');

            await hangmanInstance.confirmRequest('michael', 'dyllanhope');
            await hangmanInstance.confirmRequest('michael', 'janey');
            await hangmanInstance.confirmRequest('john', 'dyllanhope');
            await hangmanInstance.confirmRequest('john', 'michael');

            await hangmanInstance.deleteFriend('michael', 'john');
            await hangmanInstance.deleteFriend('john', 'dyllanhope');
            await hangmanInstance.deleteFriend('michael', 'dyllanhope');

            assert.strict.deepEqual(await hangmanInstance.friendList('john'), 'none');
            assert.strict.deepEqual(await hangmanInstance.friendList('dyllanhope'), 'none');
            assert.strict.deepEqual(await hangmanInstance.friendList('michael'), ['janey']);
        });
        it('Should return that dyllanhope has received 3 challenges from michael', async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');
            await hangmanInstance.addUser('john', '123');
            await hangmanInstance.addUser('janey', '123');

            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'house', 'building');
            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'technology', 'phone');
            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'music', '');
            const status = await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'helmet', 'motorbike');

            await hangmanInstance.sendChallenge('janey', 'john', 'car', '');

            assert.strict.deepEqual(await hangmanInstance.fetchChallengesFor('dyllanhope'), [
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'house',
                    hint: 'building',
                    status: 'pending'
                },
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'technology',
                    hint: 'phone',
                    status: 'pending'
                },
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'music',
                    hint: 'none',
                    status: 'pending'
                }]
            );
            assert.strict.equal(status, 'challenge limit reached');
        });
        it('Should return that dyllanhope has completed all 3 challenges with 2 wins and a loss', async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');
            await hangmanInstance.addUser('john', '123');
            await hangmanInstance.addUser('janey', '123');

            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'house', 'building');
            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'technology', 'phone');
            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'music', '');

            await hangmanInstance.setChallengeStatus('dyllanhope', 'won', 'house');
            await hangmanInstance.setChallengeStatus('dyllanhope', 'won', 'technology');
            await hangmanInstance.setChallengeStatus('dyllanhope', 'lost', 'music');

            assert.strict.deepEqual(await hangmanInstance.fetchChallengesSentBy('michael'), [
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'house',
                    hint: 'building',
                    status: 'won'
                },
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'technology',
                    hint: 'phone',
                    status: 'won'
                },
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'music',
                    hint: 'none',
                    status: 'lost'
                }]
            );

            assert.strict.deepEqual(await hangmanInstance.fetchCompleteChallenges('dyllanhope'), [
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'house',
                    hint: 'building',
                    status: 'won'
                },
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'technology',
                    hint: 'phone',
                    status: 'won'
                },
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'music',
                    hint: 'none',
                    status: 'lost'
                }]
            );
        });
        it('Should return that dyllanhope has received 3 challenges from michael', async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');
            await hangmanInstance.addUser('john', '123');
            await hangmanInstance.addUser('janey', '123');

            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'house', 'building');
            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'technology', 'phone');
            await hangmanInstance.sendChallenge('michael', 'dyllanhope', 'music', '');

            await hangmanInstance.removeChallenge('dyllanhope', 'technology');

            assert.strict.deepEqual(await hangmanInstance.fetchChallengesFor('dyllanhope'), [
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'house',
                    hint: 'building',
                    status: 'pending'
                },
                {
                    challenger: 'michael',
                    opponent: 'dyllanhope',
                    word: 'music',
                    hint: 'none',
                    status: 'pending'
                }
            ]);
        });
        it('Should return that dyllanhope has won 5 points for winning a multiplayer match', async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addPointsTo('dyllanhope', 5);
            const result = await pool.query('SELECT points FROM user_data WHERE username = $1', ['dyllanhope']);
            assert.strict.deepEqual(result.rows, [{ points: 5 }]);
        });
        it('Should return that dyllanhope has lost 5 points for losing a multiplayer game', async () => {
            const hangmanInstance = HangmanService(pool);

            await hangmanInstance.addUser('dyllanhope', '123');
            await hangmanInstance.addUser('michael', '123');

            await hangmanInstance.addPointsTo('dyllanhope', -5);
            const result = await pool.query('SELECT points FROM user_data WHERE username = $1', ['dyllanhope']);
            assert.strict.deepEqual(result.rows, [{ points: -5 }]);
        });
    });
});

// eslint-disable-next-line no-undef
after(() => {
    pool.end();
});
