const router = require('express').Router();

if (DEBUG) console.log('API - index.js - called');

router.get('/', (req, res) => {
    if (DEBUG) console.log('routes/api/index.js - GET / - called');
    res.send('../api.ejs');
});

const loginsRouter = require('./logins.js');
router.use('/logins', loginsRouter);

module.exports = router;