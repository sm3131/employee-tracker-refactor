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
            return rows
        })
}

//Function asking questions about new employee to add
function addEmployee(roles, managers) {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Please enter the employee's first name",
                validate: value => {
                    if (value && value.length <= 30) {
                        return true;
                    } else if(value.length > 30) {
                        console.log("Please enter a name with 30 or less characters");
                        return false;
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
                    if (value && value.length <= 30) {
                        return true;
                    } else if(value.length > 30) {
                        console.log("Please enter a name with 30 or less characters");
                        return false;
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

//Function to insert new employee with manager
function insertEmployee(employeeParams) {
    const sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
    VALUES (?,?,?,?)`
    const params = employeeParams

    return db.promise().query(sql, params)
        .then(() => {
            console.log('Employee has been added');
            employeeParams = [];
        })
        .catch((err) => {
            console.log(err.message);
        })
}

//Function to insert new employee without manager
function insertEmployeeNoManager(employeeParams) {
    console.log(employeeParams);
    const sql = `INSERT INTO employees (first_name, last_name, roles_id)
    VALUES (?,?,?)`
    const params = employeeParams

    return db.promise().query(sql, params)
        .then(() => {
            console.log('Employee has been added');
            employeeParams = [];
        })
        .catch((err) => {
            console.log(err.message);
        })
}

//Function to get employee id
function getEmployeeId(firstName, lastName) {
    const sql = `SELECT id FROM employees WHERE first_name = ? AND last_name = ?`
    const params = [firstName, lastName]
    return db.promise().query(sql, params)
        .then(([rows, fields]) => {
            return rows[0].id;
        })
}

//Function to ask which employee role to update
function updateEmployee(employeesArr, rolesArr) {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select an employee from the list below to update their role.',
                choices: employeesArr
            },
            {
                type: 'list',
                name: 'newRole',
                message: "Please select the employee's new role from the list of roles below.",
                choices: rolesArr
            }
        ])
    }

//Function to insert the updated role into employee table
function insertUpdatedEmployee(empParams) {
    const sql = `UPDATE employees SET roles_id = ? WHERE id = ?`;
    const params = empParams;

    return db.promise().query(sql, params)
        .then(() => {
            console.log('Employee role has been updated.');
            employeeParams = [];
        })
        .catch((err) => {
            console.log(err.message);
        })
}

//Function to select which employee to delete
function selectDeleteEmployee(employeeNames) {
    return inquirer
        .prompt(
            {
                type: 'list',
                name: 'employeeDelete',
                message: 'Select which employee you would like to delete from the list below.',
                choices: employeeNames
            }
        )
}

//Function to delete employee from database employees table
function deleteEmployee(employeeId) {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = employeeId;

    return db.promise().query(sql, params)
        .then(() => {
            console.log('Employee has been deleted.');
        })
        .catch((err) => {
            console.log(err.message);
        })
}

module.exports = { viewEmployees, getEmployeeNames, addEmployee, getEmployeeId, insertEmployee, insertEmployeeNoManager, updateEmployee, insertUpdatedEmployee, selectDeleteEmployee, deleteEmployee }