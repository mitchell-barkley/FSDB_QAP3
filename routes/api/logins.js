var router = require('express').Router();
const loginsDal = require('../../services/pg.menu.dal.js');
// const loginsDal = require('../../services/m.logins.dal.js');

if (DEBUG) console.log('API - logins.js - called');

router.get('/', async (req, res) => {
    if (DEBUG) console.log('routes/api/logins.js - GET / - called');
    try {
        let theLogins = await loginsDal.getLogins();
        res.json(theLogins);
    } catch {
        res.statusCode = 503;
        res.json({message: 'Service Unavailable', status: 503})
    }
});

module.exports = router;