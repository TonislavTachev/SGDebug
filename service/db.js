const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'password',
    port: '3306'
})

module.exports = connection

