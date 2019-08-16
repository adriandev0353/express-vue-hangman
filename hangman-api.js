module.exports = (hangmanService) => {
    const allWords = async (req, res) => {
        try {
            res.json({
                status: 'success',
                words: await hangmanService.allWords()
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const allUsers = async (req, res) => {
        try {
            res.json({
                status: 'success',
                words: await hangmanService.allUsers()
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const listWordOfSize = async (req, res) => {
        try {
            const size = req.params.size;
            res.json({
                status: 'success',
                words: await hangmanService.listWordOfSize(size)
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const addNewWord = async (req, res) => {
        try {
            const word = req.params.word;
            const addStatus = await hangmanService.addNewWord(word);
            res.json({
                status: addStatus
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const addUser = async (req, res) => {
        try {
            const details = req.body;
            await hangmanService.addUser(details.username, details.password);
            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const addWordTo = async (req, res) => {
        try {
            const details = req.body;
            await hangmanService.addWordTo(details.username, details.word);
            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const decrementPoints = async (req, res) => {
        try {
            const details = req.body;
            await hangmanService.decrementPoints(details.username, details.points);
            res.json({
                status: 'success'
            });
        } catch (err) {
            returnError(res, err);
        }
    };

    const returnError = (res, err) => {
        res.json({
            status: 'error',
            error: err.stack
        });
    };

    return {
        allWords,
        listWordOfSize,
        addNewWord,
        addUser,
        addWordTo,
        decrementPoints,
        allUsers
    };
};
