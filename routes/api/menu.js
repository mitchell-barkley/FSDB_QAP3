var router = require('express').Router();
const menuController = require('../services/pg.menu.dal.js');

router.get('/', async (req, res) => {
    try {
        const menu = await menuController.getMenu();
        res.json(menu);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;