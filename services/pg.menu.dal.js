const dal = require('./pg.menudb.js');

async function getMenu() {
    if(DEBUG) console.log('Getting menu');
    const sql = 'SELECT * FROM public.pizzas';
    try {
        const results = await dal.query(sql);
        return results.rows;
    } catch (error) {
        throw error;
    }
};

async function addMenuItem(price, name) {
    if(DEBUG) console.log('Adding menu item');
    const sql = 'INSERT INTO public.pizzas(price, pizza_name) VALUES ($1, $2)';
    try {
        let result = await dal.query(sql, [price, name]);
        return result.rows[0].id;
    } catch (error) {
        throw error;
    }
};

async function getMenuItem(id) {
    if(DEBUG) console.log('Getting menu item');
    const sql = 'SELECT * FROM public.pizzas WHERE id = $1';
    try {
        const result = await dal.query(sql, [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

async function updateMenuItem(id, price, name) {
    if(DEBUG) console.log('Updating menu item');
    const sql = 'UPDATE public.pizzas SET price = $1, pizza_name = $2 WHERE id = $3';
    try {
        const result = await dal.query(sql, [price, name, id]);
        return result.rowCount;
    } catch (error) {
        throw error;
    }
};

async function deleteMenuItem(id) {
    if(DEBUG) console.log('Deleting menu item');
    const sql = 'DELETE FROM public.pizzas WHERE id = $1';
    try {
        const result = await dal.query(sql, [id]);
        return result.rowCount;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getMenu,
    addMenuItem,
    getMenuItem,
    updateMenuItem,
    deleteMenuItem
};