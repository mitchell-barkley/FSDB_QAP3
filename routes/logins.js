const express = require('express');
const router = express.Router();
const loginsDal = require('../services/pg.logins.dal.js');

router.get('/', async (req, res) => {
    try {
        let theLogins = await loginsDal.getLogins();
        if(DEBUG) console.table(theLogins);
        res.render('./logins/logins.ejs', {theLogins});
    } catch (error) {
        res.status(503).render('error.ejs', {message: 'Service Unavailable', status: '503'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        let aLogin = await loginsDal.getLoginById(req.params.id);
        if(DEBUG) console.table(aLogin);
        if(aLogin.length === 0){
            res.render('./logins/norecordLogin.ejs', {id: req.params.id, type: 'login'});
        }
        res.render('./logins/login.ejs', {aLogin});
    } catch {
        res.render('503');
    }
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("logins.POST");
    try {
        await loginsDal.addLogin(req.body.username, req.body.password);
        res.redirect('./logins/');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('503');
    }
});

router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log("logins.EDIT");
    res.render('./logins/loginPatch.ejs', {username: req.query.username, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log("logins.DELETE");
    res.render('./logins/loginDelete.ejs', {username: req.query.username, theId: req.params.id});
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log("logins.PATCH");
    try {
        await loginsDal.updateLogin(req.params.id, req.body.username, req.body.password);
        res.redirect('/logins');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log("logins.DELETE");
    try {
        await loginsDal.deleteLogin(req.params.id);
        res.redirect('/logins');
    } catch (err){
        if(DEBUG) console.log(err);
        res.render('error.ejs', {message: 'Service Unavailable', status: '503'});
    }
});

module.exports = router