const dal = require("./pg.menudb.js");

var getMenu = function() {
    if(DEBUG) console.log('Getting menu from DB');
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM public."pizzas" ORDER BY id DESC;`;
        dal.query(sql, [], (err, res) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

var addMenuItem = function (price, pizza_name) {
    if(DEBUG) console.log('Adding menu item to DB');
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO public."pizzas" (price, pizza_name) \
            VALUES ($1, $2)`;
        dal.query(sql, [price, pizza_name], (err, res) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

var getMenuItem = function (id) {
    if(DEBUG) console.log('Getting menu item by ID from DB');
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM public."pizzas" WHERE id = $1;`;
        dal.query(sql, [id], (err, res) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

var updateMenuItem = function(id, price, name) {
    if(DEBUG) console.log('Updating menu item in DB');
    return new Promise((resolve, reject) => {
        const sql = `UPDATE public."pizzas" SET price=$1, pizza_name=$2 WHERE id=$3;`;
        dal.query(sql, [price, name, id], (err, res) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

var deleteMenuItem = function(id) {
    if(DEBUG) console.log('Deleting menu item from DB');
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM public."pizzas" WHERE id = $1';
        dal.query(sql, [id], (err, res) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

module.exports = {
    getMenu,
    addMenuItem,
    getMenuItem,
    updateMenuItem,
    deleteMenuItem
};