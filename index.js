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
    res.render('index.ejs');
});

const menuRouter = require('./routes/menu.js');
app.use('/menu', menuRouter);

const apiRouter = require('./routes/api/home.js');
app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).render('error.ejs');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;