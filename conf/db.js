var mysql = require('mysql');
require('dotenv').config();


module.exports = getConnection = function() {

    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }).on("error", (err) => {
        console.log(err);
    })

}