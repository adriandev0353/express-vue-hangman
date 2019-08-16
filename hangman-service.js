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

    return {
        reloadData
    };
};
