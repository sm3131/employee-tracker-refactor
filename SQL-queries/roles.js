const db = require('../db/connection');

//Function to view all roles
function viewRoles() {
    return db.promise().query(
        `SELECT roles.id, roles.title AS job_title, roles.salary, departments.name AS department_name
    FROM roles
    LEFT JOIN departments ON roles.departments_id = departments.id`)
        .then(([rows, fields]) => {
            console.table(rows)
        })
        .catch((err) => {
            console.log(err.message);
        })
        //.then(() => welcome())
}

module.exports = { viewRoles};