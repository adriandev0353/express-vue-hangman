module.exports = (pool) => {
    const reloadData = async (wordList) => {
        await pool.query('DELETE FROM word_list');
        for (let i = 0; i < wordList.length; i++) {
            const data = [
                i + 1,
                wordList[i],
                wordList[i].length
            ];
            await pool.query('INSERT INTO word_list(id, word, word_length) VALUES($1, $2, $3)', data);
        };
        const results = await pool.query('SELECT * FROM new_words');
        for (const item of results.rows) {
            const list = await allWords();
            const data = [
                list[list.length - 1].id + 1,
                item.word,
                item.word.length
            ];
            await pool.query('INSERT INTO word_list(id, word, word_length) VALUES($1, $2, $3)', data);
        };
    };

    const allWords = async () => {
        const result = await pool.query('SELECT * FROM word_list');
        return result.rows;
    };

    const listWordOfSize = async (num) => {
        const result = await pool.query('SELECT * FROM word_list WHERE word_length = $1', [num]);
        return result.rows;
    };

    // to add new word to repository once confirmed
    const addNewWord = async (word, user) => {
        const check = await pool.query('SELECT * FROM word_list WHERE word = $1', [word]);
        if (check.rowCount === 0) {
            const list = await allWords();
            const data = [
                list[list.length - 1].id + 1,
                word,
                word.length
            ];
            await pool.query('INSERT INTO word_list(id, word, word_length) VALUES($1, $2, $3)', data);
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
                1,
                word,
                user,
                'pending'
            ];
            await pool.query('INSERT INTO new_words(id, word, username,status) VALUES ($1, $2, $3, $4)', data);
        } else {
            const data = [
                newWords.rows[newWords.rowCount - 1].id + 1,
                word,
                user,
                'pending'
            ];
            console.log(data);
            await pool.query('INSERT INTO new_words(id, word, username,status) VALUES ($1, $2, $3, $4)', data);
        }
    };

    const newWordList = async () => {
        const results = await pool.query('SELECT * FROM new_words');
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
        const check = await pool.query('SELECT * FROM word_list WHERE word = $1', [word]);
        if (check.rowCount === 0) {
            const newWordCheck = await pool.query('SELECT * FROM new_words WHERE word = $1', [word]);
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
        const userList = allUsers.rows;

        if (search.rowCount === 0) {
            const id = userList[userList.length - 1].id + 1;
            const data = [id, username, password, 0];

            await pool.query('INSERT INTO user_data(id, username, password, points) VALUES($1, $2, $3, $4)', data);
        }
    };

    const delUser = async (id) => {
        await pool.query('DELETE FROM user_data WHERE id = $1', [id]);
    };

    const userCheck = async (username) => {
        const search = await pool.query('SELECT * FROM user_data WHERE username = $1', [username]);
        if (search.rowCount === 0) {
            return 'new account';
        } else {
            return 'already exists';
        }
    };

    const loginCheck = async (username) => {
        const search = await pool.query('SELECT password FROM user_data WHERE username = $1', [username]);
        return search.rows[0].password;
    };

    const addWordTo = async (username, word, state) => {
        const userPoints = await pool.query('SELECT points FROM user_data WHERE username = $1', [username]);
        let newPoints = 0;
        let addPoints = 0;
        if (state === 'won') {
            newPoints = userPoints.rows[0].points + word.length;
            addPoints = word.length;
        } else if (state === 'lost') {
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
        const linkData = await pool.query('SELECT * FROM table_link');
        const newID = (linkData.rows.length) + 1;

        const data = [
            newID,
            wordID,
            userID,
            state,
            addPoints
        ];

        await pool.query('INSERT INTO table_link(id, word_key, user_key, complete_state, points) VALUES($1, $2, $3, $4, $5)', data);
    };

    const allUsers = async () => {
        const result = await pool.query('SELECT * FROM user_data WHERE username != $1 ORDER BY points DESC', ['admin']);
        return result.rows;
    };

    const personalData = async (user) => {
        const result = await pool.query('SELECT table_link.id, user_data.username, word_list.word, table_link.complete_state, table_link.points FROM user_data INNER JOIN table_link ON user_data.id = table_link.user_key INNER JOIN word_list on table_link.word_key = word_list.id WHERE user_data.username = $1 ORDER BY table_link.id ASC', [user]);
        return result.rows;
    };

    const choiceFilter = async (user, choice) => {
        const result = await pool.query('SELECT table_link.id, user_data.username, word_list.word, table_link.complete_state, table_link.points FROM user_data INNER JOIN table_link ON user_data.id = table_link.user_key INNER JOIN word_list on table_link.word_key = word_list.id WHERE user_data.username = $1 AND table_link.complete_state = $2 ORDER BY table_link.id ASC', [user, choice]);
        return result.rows;
    };

    const findUser = async (user) => {
        const result = await pool.query('SELECT * FROM user_data WHERE username = $1', [user]);
        return result.rows[0];
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
        setNewWordStatus
    };
};
