const db = require('../db/connection');
const inquirer = require('inquirer');

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
}

function addRole(departments) {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Please enter the name of the role you would like to add.',
                validate: value => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter a role name!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Please enter the salary for the role you are adding.',
                validate: value => {
                    let include = value.includes(",");
                    let pass = !isNaN(value)
                    if (!include && pass) {
                        return true;
                    } else if (value.length > 10) {
                        console.log("Please enter a salary value less than 10 digits! Do NOT include commas!");
                        return false;
                    }
                    else {
                        console.log("Please enter a salary value! Do NOT include commas!");
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'Please select the department this role belongs to from the list of options below.',
                choices: departments
            }
        ])
}

//Function to insert new role
function insertRole(role, salary, departId) {
    const sql = `INSERT INTO roles (title, salary, departments_id)
    VALUES (?,?,?)`
    const params = [role, salary, departId]

    return db.promise().query(sql, params)
        .then(() => {
            console.log('Role has been added');
        })
        .catch((err) => {
            console.log(err.message);
        })
}

//Function to get role choices
function getRoleTitles() {
    return db.promise().query(`SELECT title FROM roles`)
        .then(([rows, fields]) => {
            //console.log(rows);
            return rows
        })
}

//Function to get role id
function getRoleId(name) {
    const sql = `SELECT id FROM roles WHERE title = ?`
    const params = [name]
    return db.promise().query(sql, params)
        .then(([rows, fields]) => {
            //console.log(rows)
            return rows[0].id;
        })
}

module.exports = { viewRoles, addRole, insertRole, getRoleTitles, getRoleId };