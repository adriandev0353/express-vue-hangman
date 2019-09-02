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

    const delUser = async () => {
        return 'success';
    };

    const loginCheck = async () => {
        return 'success';
    };

    const userCheck = async () => {
        return 'success';
    };

    const personalData = async () => {
        return 'success';
    };

    const findUser = async () => {
        return 'success';
    };

    const checkWord = async () => {
        return 'success';
    };

    const newWordList = async () => {
        return 'success';
    };

    const setNewWordStatus = async () => {
        return 'success';
    };

    const storeNewWord = async () => {
        return 'success';
    };

    const choiceFilter = async () => {
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
        decrementPoints,
        delUser,
        loginCheck,
        userCheck,
        personalData,
        findUser,
        checkWord,
        newWordList,
        setNewWordStatus,
        storeNewWord,
        choiceFilter
    };
};
