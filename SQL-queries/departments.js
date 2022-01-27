const db = require('../db/connection');

//Function to view a table of all departments
function viewDepartments() {
    return db.promise().query(`SELECT * FROM departments`)
        .then(([rows, fields]) => {
            console.table(rows)
        })
        .catch((err) => {
            console.log(err.message);
        })
        //.then(() => welcome())
}

module.exports = { viewDepartments }