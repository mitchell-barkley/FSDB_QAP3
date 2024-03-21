var router = require('express').Router();
const menuDal = require('../../services/pg.menu.dal.js');

if (DEBUG) console.log('API - menu.js - called');

router.get('/', async (req, res) => {
    if (DEBUG) console.log('routes/api/menu.js - GET / - called');
    try {
        let theMenu = await menuDal.getMenu();
        if(DEBUG) console.table(theMenu);
        res.json(theMenu);
    } catch {
        res.statusCode = 503;
        res.json({message: 'Service Unavailable', status: 503});
    }
});

module.exports = router;