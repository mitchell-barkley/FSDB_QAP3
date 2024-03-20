const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const menuController = require('../services/pg.menu.dal.js');

if(DEBUG) console.log('Loading menu routes');

router.get('/', async (req, res) => {
    try {
        let menu = await menuController.getMenu();
        res.render('.index.js', { menu });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const menuItem = await menuController.getMenuItem(req.params.id);
        if (menuItem === undefined) {
            res.render('error.ejs', { id: req.params.id });
        } else {
            res.render('menu', { menuItem });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        await menuController.addMenuItem(req.body);
        res.redirect('/menu/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        res.render('menuEdit.ejs', { id: req.params.id, menuItem: req.body});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await menuController.updateMenuItem(req.params.id, req.body);
        res.redirect('/menu/', { id: req.params.id, menuItem: req.body});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id/delete', async (req, res) => {
    try {
        res.render('menuDelete.ejs', { id: req.params.id, menuItem: req.body});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await menuController.deleteMenuItem(req.params.id);
        res.redirect('/menu/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;