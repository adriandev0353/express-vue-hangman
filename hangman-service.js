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
    };

    const allWords = async () => {
        const result = await pool.query('SELECT * FROM word_list');
        return result.rows;
    };

    const listWordOfSize = async (num) => {
        const result = await pool.query('SELECT * FROM word_list WHERE word_length = $1', [num]);
        return result.rows;
    };

    const addNewWord = async (word) => {
        const check = await pool.query('SELECT * FROM word_list WHERE word = $1', [word]);
        if (check.rowCount === 0) {
            const list = await allWords();
            const data = [
                list.length + 1,
                word,
                word.length
            ];
            await pool.query('INSERT INTO word_list(id, word, word_length) VALUES($1, $2, $3)', data);
            return 'success';
        } else {
            return 'This word already exists in our database';
        };
    };
    const addUser = async (username, password) => {
        const search = await pool.query('SELECT * FROM user_data WHERE username = $1', [username]);
        if (search.rowCount === 0) {
            const list = await allUsers();
            const id = list.length + 1;
            const data = [id, username, password, 0, ''];

            await pool.query('INSERT INTO user_data(id, username, password, points, words_played) VALUES($1, $2, $3, $4, $5)', data);
        }
    };

    const userCheck = async (username) => {
        const search = await pool.query('SELECT * FROM user_data WHERE username = $1', [username]);
        if (search.rowCount === 0) {
            return 'new account';
        } else {
            return 'already exists';
        }
    };

    const addWordTo = async (username, word) => {
        const result = await pool.query('SELECT * FROM user_data WHERE username = $1', [username]);
        const played = result.rows[0].words_played + word + ',';
        const points = word.length;
        const newPoints = result.rows[0].points + points;

        await pool.query('UPDATE user_data SET points = $1, words_played = $2 WHERE username = $3', [newPoints, played, username]);
    };

    const decrementPoints = async (username, points) => {
        const result = await pool.query('SELECT * FROM user_data WHERE username = $1', [username]);
        let newPoints = result.rows[0].points - points;

        if (newPoints < 0) {
            newPoints = 0;
        };
        await pool.query('UPDATE user_data SET points = $1 WHERE username = $2', [newPoints, username]);
    };

    const allUsers = async () => {
        const result = await pool.query('SELECT * FROM user_data');
        return result.rows;
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
        decrementPoints
    };
};
