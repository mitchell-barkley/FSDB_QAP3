const router = require('express').Router();

if (DEBUG) console.log('API - index.js - called');

router.get('/', (req, res) => {
    if (DEBUG) console.log('routes/api/index.js - GET / - called');
    res.render('../views/api.ejs');
});

const loginsRouter = require('./logins.js');
router.use('/logins/logins.ejs', loginsRouter);

const menuRouter = require('./menu.js');
router.use('/menu/menu.ejs', menuRouter);

module.exports = router;