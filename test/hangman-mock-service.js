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

    const allUsers = async () => { return 'success'; };

    const delUser = async () => { return 'success'; };

    const loginCheck = async () => { return 'success'; };

    const userCheck = async () => { return 'success'; };

    const personalData = async () => { return 'success'; };

    const findUser = async () => { return 'success'; };

    const checkWord = async () => { return 'success'; };

    const newWordList = async () => { return 'success'; };

    const setNewWordStatus = async () => { return 'success'; };

    const storeNewWord = async () => { return 'success'; };

    const choiceFilter = async () => { return 'success'; };

    const linkTableData = async () => { return 'success'; };

    const checkWordsGuessed = async () => { return 'success'; };

    const addFriends = async () => { return 'success'; };

    const returnFriendRequests = async => { return 'success'; };

    const friendList = async => { return 'success'; };

    const confirmRequest = async => { return 'success'; };

    const denyRequest = async => { return 'success'; };

    const deleteFriend = async => { return 'success'; };

    const sendChallenge = async => { return 'success'; };

    const fetchChallengesFor = async => { return 'success'; };

    const fetchChallengesSentBy = async => { return 'success'; };

    const fetchCompleteChallenges = async => { return 'success'; };

    const setChallengeStatus = async => { return 'success'; };

    const removeChallenge = async => { return 'success'; };

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
        fetchCompleteChallenges,
        setChallengeStatus,
        removeChallenge
    };
};
