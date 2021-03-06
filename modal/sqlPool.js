const mysql = require('mysql');

module.exports = (function () {
    var pool = mysql.createPool({
        connectionLimit: 2,
        host: '172.16.13.12',
        user: 'root',
        password: 'root',
        database: 'project'
    });
    return function (sql, arr, fn) {
        pool.getConnection(function (err, connection) {
            if (!err) {
                connection.query(sql, arr, function (err, data) {
                    fn(err,data);
                });
                connection.release();
            } else {
                console.log(err.message);
            }
        })
    }
})()