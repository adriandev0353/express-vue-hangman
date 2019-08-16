module.exports = (pool) => {
    const reloadData = async (wordList) => {
        if (wordList) {
            return 'success';
        };
    };

    const allWords = async () => {
        return 'success';
    };

    const listWordOfSize = async (num) => {
        if (num) {
            return 'success';
        };
    };

    const addNewWord = async (word) => {
        if (word) {
            return 'success';
        };
    };
    const addUser = async (username, password) => {
        if (username && password) {
            return 'success';
        };
    };

    const addWordTo = async (username, word) => {
        if (username && word) {
            return 'success';
        };
    };

    const decrementPoints = async (username, points) => {
        if (username && points) {
            return 'success';
        };
    };

    const allUsers = async () => {
        return 'success';
    };

    return {
        reloadData,
        listWordOfSize,
        allWords,
        addNewWord,
        allUsers,
        addUser,
        addWordTo,
        decrementPoints
    };
};
