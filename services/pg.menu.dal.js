const dal = require('../services/pg.menudb.js');

var getMenu = async function getMenu() {
    if(DEBUG) console.log('Getting menu');
    return new Promise((resolve, reject) => {
        resolve(
            dal.pool.query('SELECT * FROM public.pizzas')
        );
    });
};

var addMenuItem = async function addMenuItem(item) {
    if(DEBUG) console.log('Adding menu item');
    return new Promise((resolve, reject) => {
        resolve(
            dal.pool.query('INSERT INTO public.pizzas(price, pizza_name) \
            VALUES ();', [item.price, item.name] )
        );
    });
};

var getMenuItem = async function getMenuItem(id) {
    if(DEBUG) console.log('Getting menu item');
    return new Promise((resolve, reject) => {
        resolve(
            dal.pool.query('SELECT * FROM public.pizzas WHERE id = $1', [id])
            );
    });
};

var updateMenuItem = async function updateMenuItem(id, item) {
    if(DEBUG) console.log('Updating menu item');
    return new Promise((resolve, reject) => {
        resolve(
            dal.pool.query('UPDATE public.pizzas SET name = $1, price = $2 WHERE id = $3', [item.name, item.price, id])
        );
    });
};

var deleteMenuItem = async function deleteMenuItem(id) {
    if(DEBUG) console.log('Deleting menu item');
    return new Promise((resolve, reject) => {
        resolve(
            dal.pool.query('DELETE FROM public.pizzas WHERE id = $1', [id])
        );
    });
};

module.exports = {
    getMenu,
    addMenuItem,
    getMenuItem,
    updateMenuItem,
    deleteMenuItem
};