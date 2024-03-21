const express = require('express');
const router = express.Router();
const menuDal = require('../services/pg.menu.dal.js');

router.get('/', async (req, res) => {
    try {
        let theMenu = await menuDal.getMenu();
        if(DEBUG) console.table(theMenu);
        res.render('./menu/menu.ejs', {theMenu});
    } catch (error) {
        res.status(503).render('error.ejs', {message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        let menuItem = await menuDal.getMenuById(req.params.id);
        if(DEBUG) console.table(menuItem);
        if(menuItem.length === 0){
            res.render('./menu/norecordMenu.ejs', {id: req.params.id, type: 'menu'});
        }
        res.render('./menu/menuItem.ejs', {menuItem});
    } catch {
        res.render('503');
    }
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("menu.POST");
    try {
        await menuDal.addMenuItem(req.body.menuItem, req.body.price);
        res.redirect('./menu/');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('503');
    }
});

router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log("menu.EDIT");
    res.render('./menu/menuEdit.ejs', {id: req.params.id, menuItem: req.query.menuItem, price: req.query.price});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log("menu.DELETE");
    res.render('./menu/menuDelete.ejs', {id: req.params.id, menuItem: req.query.menuItem, price: req.query.price});
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log("menu.PATCH");
    try {
        await menuDal.updateMenuItem(req.params.id, req.body.username, req.body.password);
        res.redirect('/menu/');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log("menu.DELETE");
    try {
        await menuDal.deleteMenuItem(req.params.id);
        res.redirect('/menu');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('error.ejs', {message: 'Service Unavailable', status: '503'});
    }
});

module.exports = router