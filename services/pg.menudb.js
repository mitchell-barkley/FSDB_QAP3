const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'restaurant',
    password: 'ResistanceL16',
    port: 16000,
});

module.exports = {
    pool
};