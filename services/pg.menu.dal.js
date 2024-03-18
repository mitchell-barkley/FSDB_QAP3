const dal = require('../dal/pg.menudb.js');

var getMenu = async function getMenu() {
    if(DEBUG) console.log('Getting menu');
    return new Promise((resolve, reject) => {
        resolve([
            { name: 'Pizza', price: 10 },
            { name: 'Pasta', price: 8 },
            { name: 'Salad', price: 5 }
        ]);
    });
};

var addMenuItem = async function addMenuItem(item) {
    if(DEBUG) console.log('Adding menu item');
    return new Promise((resolve, reject) => {
        resolve();
    });
};

var getMenuItem = async function getMenuItem(id) {
    if(DEBUG) console.log('Getting menu item');
    return new Promise((resolve, reject) => {
        resolve({ name: 'Pizza', price: 10 });
    });
};

var updateMenuItem = async function updateMenuItem(id, item) {
    if(DEBUG) console.log('Updating menu item');
    return new Promise((resolve, reject) => {
        resolve();
    });
};

var deleteMenuItem = async function deleteMenuItem(id) {
    if(DEBUG) console.log('Deleting menu item');
    return new Promise((resolve, reject) => {
        resolve();
    });
};

module.exports = {
    getMenu,
    addMenuItem,
    getMenuItem,
    updateMenuItem,
    deleteMenuItem
};