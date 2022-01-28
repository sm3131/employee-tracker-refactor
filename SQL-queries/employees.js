const db = require('../db/connection');
const inquirer = require('inquirer');

//Function to view all employees
function viewEmployees() {
    return db.promise().query(
        `SELECT employees.id, employees.first_name AS employee_first, employees.last_name AS employee_last, managers.first_name AS manager_first, managers.last_name AS manager_last, roles.title AS job_title, roles.salary, departments.name AS department_name  
    FROM employees 
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    LEFT JOIN roles ON employees.roles_id = roles.id
    LEFT JOIN departments ON roles.departments_id = departments.id`)
        .then(([rows, fields]) => {
            console.table(rows)
        })
        .catch((err) => {
            console.log(err.message);
        })
}

//Function to get employee names
function getEmployeeNames() {
    return db.promise().query(`SELECT first_name, last_name FROM employees`)
        .then(([rows, fields]) => {
            //console.log(rows);
            return rows
        })
}

function addEmployee(roles, managers) {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Please enter the employee's first name",
                validate: value => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the employee's first name!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Please enter the employee's last name",
                validate: value => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter the employee's last name!");
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: "Please select the employee's role from the list of options below.",
                choices: roles
            },
            {
                type: 'list',
                name: 'employeeManager',
                message: "Please select the employee's manager from the list of options below, or select null if this does not apply.",
                choices: managers
            }
        ])
}

//Function to get employee id
function getEmployeeId(firstName, lastName) {
    const sql = `SELECT id FROM employees WHERE first_name = ? AND last_name = ?`
    const params = [firstName, lastName]
    return db.promise().query(sql, params)
        .then(([rows, fields]) => {
            //console.log(rows)
            return rows[0].id;
        })
}

module.exports = { viewEmployees, getEmployeeNames, addEmployee, getEmployeeId }