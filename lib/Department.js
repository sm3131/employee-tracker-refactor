const db = require('../db/connection');

class Department {
        getId = function(name) {
            const sql = `SELECT id FROM departments WHERE name = ?`
            const params = [name] 
            return db.promise().query(sql, params)
                .then(([rows, fields]) => {
                    console.log(rows)
                    return rows[0].id;
                })
        } 
}

module.exports = Department