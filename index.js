const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs')
});

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const loginsRouter = require('./routes/logins.js');
app.use('/logins', loginsRouter);

const menuRouter = require('./routes/menu.js');
app.use('/menu', menuRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
