const dal = require("./pg.auth_db");

var getLogins = function () {
    if(DEBUG) console.log('services/pg.logins.dal.getLogin - called');
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM public."Logins" ORDER BY id DESC;`;
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

var getLoginById = function (id) {
    if(DEBUG) console.log('services/pg.logins.dal.getLoginById - called');
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM public."Logins" WHERE id = $1;`;
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

var addLogin = function (username, password) {
    if(DEBUG) console.log('services/pg.logins.dal.addLogin - called');
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO public."Logins" (username, password) \
            VALUES ($1, $2)`;
        dal.query(sql, [username, password], (err, res) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

var updateLogin = function(id, username, password) {
    if(DEBUG) console.log('logins.pg.dal.updateLogin - called');
    return new Promise((resolve, reject) => {
        const sql = `UPDATE public."Logins" SET username=$2, password=$3 WHERE id=$1;`;
        dal.query(sql, [id, username, password], (err, res) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });
};

var deleteLogin = function(id) {
    if(DEBUG) console.log('services/pg.logins.dal.deleteLogin - called');
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM public."Logins" WHERE id = $1;`;
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
    addLogin,
    getLogins,
    getLoginById,
    updateLogin,
    deleteLogin
};