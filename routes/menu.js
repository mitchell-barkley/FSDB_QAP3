const express = require('express');
const router = express.Router();
const menuController = require('../services/pg.menu.dal.js');

router.get('/', async (req, res) => {
    try {
        const menu = await menuController.getMenu();
        res.render('views/menu.ejs', { menu });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        await menuController.addMenuItem(req.body);
        res.redirect('views/menu.ejs');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const menuItem = await menuController.getMenuItem(req.params.id);
        res.render('views/menuItem.ejs', { menuItem });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await menuController.updateMenuItem(req.params.id, req.body);
        res.redirect('/menu');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await menuController.deleteMenuItem(req.params.id);
        res.redirect('/menu');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;