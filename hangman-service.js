module.exports = (pool) => {
    const reloadData = async (wordList) => {
        await pool.query('DELETE FROM word_list');
        for (let i = 0; i < wordList.length; i++) {
            const data = [
                wordList[i],
                wordList[i].length
            ];
            await pool.query('INSERT INTO word_list(word, word_length) VALUES($1, $2)', data);
        };
        const results = await pool.query('SELECT * FROM new_words');
        for (const item of results.rows) {
            const data = [
                item.word,
                item.word.length
            ];
            await pool.query('INSERT INTO word_list(word, word_length) VALUES($1, $2)', data);
        };
    };

    const allWords = async () => {
        const result = await pool.query('SELECT word, word_length FROM word_list');
        return result.rows;
    };

    const listWordOfSize = async (num) => {
        const result = await pool.query('SELECT word, word_length FROM word_list WHERE word_length = $1', [num]);
        return result.rows;
    };

    // to add new word to repository once confirmed
    const addNewWord = async (word, user) => {
        const check = await pool.query('SELECT * FROM word_list WHERE word = $1', [word]);
        if (check.rowCount === 0) {
            const data = [
                word,
                word.length
            ];
            await pool.query('INSERT INTO word_list(word, word_length) VALUES($1, $2)', data);
            const userPoints = await pool.query('SELECT points FROM user_data WHERE username = $1', [user]);
            const newPoints = userPoints.rows[0].points + 3;
            await pool.query('UPDATE user_data SET points = $1 WHERE username = $2', [newPoints, user]);
        };
    };
    // to add words into 'new word' table to be confirmed
    const storeNewWord = async (word, user) => {
        const newWords = await pool.query('SELECT * FROM new_words');

        if (newWords.rowCount === 0) {
            const data = [
                word,
                user,
                'pending'
            ];
            await pool.query('INSERT INTO new_words(word, username,status) VALUES ($1, $2, $3)', data);
        } else {
            const data = [
                word,
                user,
                'pending'
            ];
            await pool.query('INSERT INTO new_words(word, username,status) VALUES ($1, $2, $3)', data);
        }
    };

    const newWordList = async () => {
        const results = await pool.query('SELECT word,username,status FROM new_words');
        return results.rows;
    };

    const setNewWordStatus = async (word, status) => {
        if (status === 'confirmed') {
            await pool.query('UPDATE new_words SET status = $1 WHERE word = $2', [status, word]);
        } else {
            await pool.query('DELETE FROM new_words WHERE word = $1', [word]);
        }
    };

    const checkWord = async (word) => {
        const check = await pool.query('SELECT word, word_length FROM word_list WHERE word = $1', [word]);
        if (check.rowCount === 0) {
            const newWordCheck = await pool.query('SELECT word, username, status FROM new_words WHERE word = $1', [word]);
            if (newWordCheck.rowCount === 0) {
                return 'new';
            } else {
                return 'exists';
            }
        } else {
            return 'exists';
        };
    };

    const addUser = async (username, password) => {
        const search = await pool.query('SELECT * FROM user_data WHERE username = $1', [username]);
        const allUsers = await pool.query('SELECT * FROM user_data ORDER BY id ASC');

        if (allUsers.rowCount === 0) {
            const data = [username, password, 0, 0];
            await pool.query('INSERT INTO user_data(username, password, points, win_rate) VALUES($1, $2, $3, $4)', data);
        } else if (search.rowCount === 0) {
            const data = [username, password, 0, 0];

            await pool.query('INSERT INTO user_data(username, password, points, win_rate) VALUES($1, $2, $3, $4)', data);
        }
    };

    const delUser = async (username) => {
        await pool.query('DELETE FROM user_data WHERE username = $1', [username]);
    };

    const userCheck = async (username) => {
        const search = await pool.query('SELECT username, password, points, win_rate FROM user_data WHERE username = $1', [username]);
        if (search.rowCount === 0) {
            return 'new account';
        } else {
            return 'already exists';
        }
    };

    const loginCheck = async (username) => {
        const search = await pool.query('SELECT password FROM user_data WHERE username = $1', [username]);
        if (search.rowCount === 0) {
            return 'Not found';
        } else {
            return search.rows[0].password;
        }
    };

    const addWordTo = async (username, word, state) => {
        const userPoints = await pool.query('SELECT points FROM user_data WHERE username = $1', [username]);
        let newPoints = 0;
        let addPoints = 0;
        if (state === 'won') {
            newPoints = userPoints.rows[0].points + word.length;
            addPoints = word.length;
        } else {
            const decPoints = Math.ceil(word.length / 2);
            newPoints = userPoints.rows[0].points - decPoints;
            addPoints = -decPoints;
            if (newPoints < 0) {
                newPoints = 0;
            }
        }
        await pool.query('UPDATE user_data SET points = $1 WHERE username = $2', [newPoints, username]);

        const user = await pool.query('SELECT id FROM user_data WHERE username = $1', [username]);
        const userID = user.rows[0].id;
        const resultWord = await pool.query('SELECT id FROM word_list WHERE word = $1', [word]);
        const wordID = resultWord.rows[0].id;

        const data = [
            wordID,
            userID,
            state,
            addPoints
        ];

        await pool.query('INSERT INTO table_link(word_key, user_key, complete_state, points) VALUES($1, $2, $3, $4)', data);
        const userData = await personalData(username);
        if (userData.length > 0) {
            let gameCount = 0;
            let winCount = 0;
            for (const item of userData) {
                gameCount++;
                if (item.complete_state === 'won') {
                    winCount++;
                };
            };
            const winRate = ((winCount / gameCount) * 100).toFixed(2);
            await pool.query('UPDATE user_data SET win_rate = $1 WHERE username = $2', [winRate, username]);
        }
    };

    const allUsers = async () => {
        const result = await pool.query('SELECT username, password, points, win_rate, friends FROM user_data WHERE username != $1 ORDER BY points DESC, win_rate DESC', ['admin']);
        return result.rows;
    };

    const linkTableData = async () => {
        const result = await pool.query('SELECT user_data.username, word_list.word, table_link.complete_state, table_link.points FROM user_data INNER JOIN table_link ON user_data.id = table_link.user_key INNER JOIN word_list on table_link.word_key = word_list.id ORDER BY table_link.points DESC');
        return result.rows;
    };

    const personalData = async (user) => {
        const result = await pool.query('SELECT user_data.username, word_list.word, table_link.complete_state, table_link.points FROM user_data INNER JOIN table_link ON user_data.id = table_link.user_key INNER JOIN word_list on table_link.word_key = word_list.id WHERE user_data.username = $1 ORDER BY table_link.id ASC', [user]);
        return result.rows;
    };

    const choiceFilter = async (user, choice) => {
        const result = await pool.query('SELECT user_data.username, word_list.word, table_link.complete_state, table_link.points FROM user_data INNER JOIN table_link ON user_data.id = table_link.user_key INNER JOIN word_list on table_link.word_key = word_list.id WHERE user_data.username = $1 AND table_link.complete_state = $2 ORDER BY table_link.id ASC', [user, choice]);
        return result.rows;
    };

    const findUser = async (user) => {
        const result = await pool.query('SELECT username, password, points, win_rate, friends FROM user_data WHERE username LIKE $1 AND username != $2', ['%' + user + '%', 'admin']);
        return result.rows;
    };

    const checkWordsGuessed = async (user, word) => {
        const result = await pool.query('SELECT user_data.username, word_list.word, table_link.complete_state, table_link.points FROM user_data INNER JOIN table_link ON user_data.id = table_link.user_key INNER JOIN word_list on table_link.word_key = word_list.id WHERE user_data.username = $1 AND word_list.word = $2 ORDER BY table_link.id ASC', [user, word]);
        if (result.rowCount === 0) {
            return 'not found';
        } else {
            return 'found';
        };
    };

    const addFriends = async (requester, receiver) => {
        const check = await pool.query('SELECT * FROM friend_link WHERE (requester = $1  AND receiver = $2) OR (requester = $3 AND receiver = $4)', [requester, receiver, receiver, requester]);
        if (check.rowCount === 0) {
            await pool.query('INSERT INTO friend_link(requester, receiver, status) VALUES($1, $2, $3)', [requester, receiver, 'pending']);
            return 'success';
        } else {
            return 'exists';
        }
    };

    const returnFriendRequests = async (receiver) => {
        const requests = await pool.query('SELECT * FROM friend_link WHERE receiver = $1 AND status = $2', [receiver, 'pending']);
        if (requests.rowCount > 0) {
            return requests.rows;
        } else {
            return 'none';
        }
    };

    const confirmRequest = async (requester, receiver) => {
        await pool.query('UPDATE friend_link SET status = $1 WHERE (requester = $2 AND receiver = $3) OR (requester = $3 AND receiver = $2)', ['confirmed', requester, receiver]);
        const friendListReq = await pool.query('SELECT friends FROM user_data WHERE username = $1', [requester]);
        const friendListRec = await pool.query('SELECT friends FROM user_data WHERE username = $1', [receiver]);

        if (friendListReq.rows[0].friends === null) {
            await pool.query('UPDATE user_data SET friends = $1 WHERE username = $2', [receiver + ',', requester]);
        } else {
            const friends = friendListReq.rows[0].friends;
            const newFriendList = friends + receiver + ',';
            await pool.query('UPDATE user_data SET friends = $1 WHERE username = $2', [newFriendList, requester]);
        };

        if (friendListRec.rows[0].friends === null) {
            await pool.query('UPDATE user_data SET friends = $1 WHERE username = $2', [requester + ',', receiver]);
        } else {
            const friends = friendListRec.rows[0].friends;
            const newFriendList = friends + requester + ',';
            await pool.query('UPDATE user_data SET friends = $1 WHERE username = $2', [newFriendList, receiver]);
        }
    };

    const deleteFriend = async (user, friend) => {
        // updating users friend list without the friend in it
        const userFriends = await pool.query('SELECT friends FROM user_data WHERE username = $1', [user]);
        const userList = userFriends.rows[0].friends;
        console.log(userList, 'userList');
        const newUserList = [];
        const userFriendList = userList.split(',');
        userFriendList.length -= 1;
        for (let i = 0; i < userFriendList.length; i++) {
            if (friend !== userFriendList[i]) {
                newUserList.push(userFriendList[i]);
            };
        };

        console.log(newUserList, 'newUserList');
        let newUserFriendsList = '';
        if (newUserList.length !== 0) {
            for (const item of newUserList) {
                newUserFriendsList += item + ',';
            }
        } else {
            newUserFriendsList = null;
        }
        // updating the friends friend list without the user in it
        const friendFriends = await pool.query('SELECT friends FROM user_data WHERE username = $1', [friend]);
        const friendList = friendFriends.rows[0].friends;
        console.log(friendList, 'friendList');
        const newFriendList = [];
        const friendFriendList = friendList.split(',');
        friendFriendList.length -= 1;
        for (let i = 0; i < friendFriendList.length; i++) {
            if (user !== friendFriendList[i]) {
                newFriendList.push(friendFriendList[i]);
            };
        };

        console.log(newFriendList, 'newFriendList');

        let newFriendFriendsList = '';
        if (newFriendList.length !== 0) {
            for (const item of newFriendList) {
                newFriendFriendsList += item + ',';
            }
        } else {
            newFriendFriendsList = null;
        }

        console.log(newFriendFriendsList, 'friend');
        console.log(newUserFriendsList, 'user');

        await pool.query('UPDATE user_data SET friends = $1 WHERE username = $2', [newUserFriendsList, user]);
        await pool.query('UPDATE user_data SET friends = $1 WHERE username = $2', [newFriendFriendsList, friend]);

        await pool.query('DELETE FROM friend_link WHERE (requester = $1 AND receiver = $2) OR (requester = $2 AND receiver = $1)', [user, friend]);
    };

    const denyRequest = async (requester, receiver) => { await pool.query('DELETE FROM friend_link WHERE (requester = $1 AND receiver = $2) OR (requester = $2 AND receiver = $1)', [requester, receiver]); };

    const friendList = async (user) => {
        const friends = await pool.query('SELECT friends FROM user_data WHERE username = $1', [user]);
        if (friends.rows[0].friends === null) {
            return 'none';
        } else {
            const friendsList = friends.rows[0].friends;
            const list = friendsList.split(',');
            const length = list.length - 1;
            list.length = length;
            return list;
        }
    };

    const sendChallenge = async (challenger, opponent, word, hint) => {
        let savedHint = '';
        if (hint === '') {
            savedHint = 'none';
        } else {
            savedHint = hint;
        }

        const check = await pool.query('SELECT * FROM user_challenges WHERE challenger = $1', [challenger]);
        if (check.rowCount !== 3) {
            await pool.query('INSERT INTO user_challenges(challenger, opponent, word, hint, status) VALUES($1, $2, $3, $4, $5)', [challenger, opponent, word, savedHint, 'pending']);
            return 'challenge sent';
        } else {
            return 'challenge limit reached';
        };
    };

    const fetchChallengesFor = async (user) => {
        const results = await pool.query('SELECT * FROM user_challenges WHERE opponent = $1 AND status = $2', [user, 'pending']);
        return results.rows;
    };

    const fetchCompleteChallenges = async (user) => {
        const results = await pool.query('SELECT * FROM user_challenges WHERE opponent = $1 AND (status = $2 OR status = $3)', [user, 'won', 'lost']);
        return results.rows;
    };

    const fetchChallengesSentBy = async (user) => {
        const results = await pool.query('SELECT * FROM user_challenges WHERE challenger = $1', [user]);
        return results.rows;
    };

    return {
        reloadData,
        listWordOfSize,
        allWords,
        addNewWord,
        allUsers,
        addUser,
        userCheck,
        addWordTo,
        loginCheck,
        personalData,
        choiceFilter,
        findUser,
        delUser,
        checkWord,
        storeNewWord,
        newWordList,
        setNewWordStatus,
        linkTableData,
        checkWordsGuessed,
        addFriends,
        returnFriendRequests,
        friendList,
        confirmRequest,
        denyRequest,
        deleteFriend,
        sendChallenge,
        fetchChallengesFor,
        fetchChallengesSentBy,
        fetchCompleteChallenges
    };
};
