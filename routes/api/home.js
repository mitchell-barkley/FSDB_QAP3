var router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.send('../views/index.ejs');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const menuRouter = require('../menu.js');
router.use('/menu', menuRouter);

module.exports = router;