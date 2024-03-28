const express = require('express');
const router = express.Router();
const menuDal = require('../services/pg.menu.dal.js');
const { locals } = require('../index.js');

router.get('/', async (req, res) => {
    try {
        let theMenu = await menuDal.getMenu();
        if(DEBUG) console.table(theMenu);
        res.render('./menu/menu.ejs', {theMenu});
    } catch (error) {
        res.render('error.ejs', {message: 'Service Unavailable', status: '503'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        let menuItem = await menuDal.getMenuById(req.params.id);
        if(DEBUG) console.table(menuItem);
        if(menuItem.length === 0){
            res.render('./menu/norecordMenu.ejs', {id: req.params.id, pizza_name: req.query.pizza_name, price: req.query.price, sauce: req.query.sauce, cheese: req.query.cheese, topping1: req.query.topping1, topping2: req.query.topping2, topping3: req.query.topping3, topping4: req.query.topping4, topping5: req.query.topping5, topping6: req.query.topping6});
        }
        res.render('./menu/menuItem.ejs', {menuItem});
    } catch {
        res.render('error.ejs', {message: 'Service Unavailable', status: '503'});
    }
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("menu.POST");
    try {
        await menuDal.addMenuItem(req.body.price, req.body.pizza_name, req.body.sauce, req.body.cheese, req.body.topping1, req.body.topping2, req.body.topping3, req.body.topping4, req.body.topping5, req.body.topping6);
        res.redirect('./menu/');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('error.ejs', {message: 'Service Unavailable', status: '503'});
    }
});

router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log("menu.EDIT");
    console.log(locals)
    res.render('./menu/menuEdit.ejs', {theId: req.params.id, menuItem: req.query.menuItem, price: req.query.price, sauce: req.query.sauce, cheese: req.query.cheese, topping1: req.query.topping1, topping2: req.query.topping2, topping3: req.query.topping3, topping4: req.query.topping4, topping5: req.query.topping5, topping6: req.query.topping6});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log("menu.DELETE");
    res.render('./menu/menuDelete.ejs', {theId: req.params.id, menuItem: req.query.menuItem, price: req.query.price, sauce: req.query.sauce, cheese: req.query.cheese, topping1: req.query.topping1, topping2: req.query.topping2, topping3: req.query.topping3, topping4: req.query.topping4, topping5: req.query.topping5, topping6: req.query.topping6});
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log("menu.PATCH");
    try {
        await menuDal.updateMenuItem(req.params.id, req.body.price, req.body.pizza_name, req.body.sauce, req.body.cheese, req.body.topping1, req.body.topping2, req.body.topping3, req.body.topping4, req.body.topping5, req.body.topping6);
        res.redirect('/menu');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('error.ejs', {message: 'Service Unavailable', status: '503'});
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