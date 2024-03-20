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

router.get('/:id', async (req, res) => {
    try {
        const menuItem = await menuController.getMenuItem(req.params.id);
        if (menuItem === undefined) {
            res.status(404).json({ id: req.params.id });
        } else {
            res.json(menuItem);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;