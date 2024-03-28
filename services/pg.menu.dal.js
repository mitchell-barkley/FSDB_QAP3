const dal = require("./pg.menudb.js");

var getMenu = function() {
    if(DEBUG) console.log('Getting menu from DB');
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM public."pizzas" ORDER BY price ASC;`;
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

var addMenuItem = function (price, pizza_name, sauce, cheese, topping1, topping2, topping3, topping4, topping5, topping6) {
    if(DEBUG) console.log('Adding menu item to DB');
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO public.pizzas(price, pizza_name, sauce, cheese, topping1, topping2, topping3, topping4, topping5, topping6) \
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        for (let i = 0; i < 10; i++) {
            if (arguments[i] === undefined || arguments[i] === "") {
                arguments[i] = " ";
            }
        }
        console.log(arguments);
        dal.query(sql, [price, pizza_name, sauce, cheese, topping1, topping2, topping3, topping4, topping5, topping6], (err, res) => {
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

var updateMenuItem = function(id, price, pizza_name, sauce, cheese, topping1, topping2, topping3, topping4, topping5, topping6) {
    if(DEBUG) console.log('Updating menu item in DB');
    return new Promise((resolve, reject) => {
        const sql = `UPDATE public."pizzas" SET price=$2, pizza_name=$3, sauce=$4, cheese=$5, topping1=$6, topping2=$7, topping3=$8, topping4=$9, topping5=$10, topping6=$11 WHERE id=$1;`;
        for (let i = 0; i < 10; i++) {
            if (arguments[i] === undefined || arguments[i] === "") {
                arguments[i] = " ";
            }
        }
        dal.query(sql, [id, price, pizza_name, sauce, cheese, topping1, topping2, topping3, topping4, topping5, topping6], (err, res) => {
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