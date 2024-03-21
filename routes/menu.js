const express = require('express');
const router = express.Router();
const menuDal = require('../services/pg.menu.dal.js');
// const menuDal = require('../../services/m.menu.dal');

router.get('/', async (req, res) => {
    try {
        let themenu = await menuDal.getMenu();
        if(DEBUG) console.table(themenu);
        res.render('menu', {themenu});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
    try {
        let aLogin = await menuDal.getMenuById(req.params.id);
        if(DEBUG) console.table(aLogin);
        if(aLogin.length === 0){
            res.render('norecord', {id: req.params.id, type: 'login'});
        }
        res.render('login', {aLogin});
    } catch {
        res.render('503');
    }
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("menu.POST");
    try {
        await menuDal.addLogin(req.body.username, req.body.password);
        res.redirect('/menu/');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('503');
    }
});

router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log("menu.EDIT");
    res.render('loginPatch.ejs', {username: req.query.username, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log("menu.DELETE");
    res.render('loginDelete.ejs', {username: req.query.username, theId: req.params.id});
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log("menu.PATCH");
    try {
        await menuDal.updateLogin(req.params.id, req.body.username, req.body.password);
        res.redirect('/menu/');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log("menu.DELETE");
    try {
        await menuDal.deleteLogin(req.params.id);
        res.redirect('/menu/');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('503');
    }
});

module.exports = router