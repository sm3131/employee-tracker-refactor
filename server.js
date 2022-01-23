const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to database
db.connect(err => {
    if (err) throw err;
});

console.log('Welcome to the Employee Tracker Application! With this app you can view and manage both your company and employee information. Answer the prompt below to get started.');

function welcome() {
    inquirer
        .prompt({
            type: 'list',
            name: 'trackerOptions',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Leave application']
        })
        .then(({ trackerOptions }) => {
            if (trackerOptions === 'View all departments') {
                viewDepartments();
            } else if (trackerOptions === 'View all roles') {
                viewRoles();
            } else if (trackerOptions === 'View all employees') {
                viewEmployees();
            } else if (trackerOptions === 'Add a department') {
                addDepartment().then(value => {
                    const departmentName = value.department
                    insertDepartment(departmentName)
                })
            } else if (trackerOptions === 'Add a role') {
                getChoices();
            } else if (trackerOptions === 'Add an employee') {
                addEmployee();
            } else if (trackerOptions === 'Update an employee') {
                updateEmployee();
            } else if (trackerOptions === 'Leave application') {
                console.log('Have a Great Day!');
                process.exit();
            }
        })
}

function viewDepartments() {
    db.promise().query(`SELECT * FROM departments`)
        .then(([rows, fields]) => {
            console.table(rows)
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then(() => welcome())
}

function viewRoles() {
    db.promise().query(
        `SELECT roles.id, roles.title AS job_title, roles.salary, departments.name AS department_name
    FROM roles
    LEFT JOIN departments ON roles.departments_id = departments.id`)
        .then(([rows, fields]) => {
            console.table(rows)
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then(() => welcome())
}

function viewEmployees() {
    db.promise().query(
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
        .then(() => welcome())
}

function addDepartment() {
    return inquirer
        .prompt(
            {
                type: 'input',
                name: 'department',
                message: 'Please enter the name of the department you would like to add.',
                validate: value => {
                    if (value) {
                        return true;
                    } else {
                        console.log("Please enter a department name!");
                        return false;
                    }
                }
            })
}

function insertDepartment(department) {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const param = [department];

    db.promise().query(sql, param)
        .then(() => {
            console.log('Department has been added');
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then(() => welcome())
}

function addRole(department) {
    inquirer
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
                    } else {
                        console.log("Please enter a salary value! Do NOT include commas!");
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'Please select the department this role belongs to from the list of options below.',
                choices: department
            }
        ])
        .then(value => {
            let role = value.roleName;
            let salary = value.roleSalary;
            let roleDepart = value.roleDepartment;

            let departIdArr = department.filter(getId)
            let departId = departIdArr[0].id

            function getId(item) {
                if (item.name === roleDepart) {
                    return item.id
                }
            }

            const sql = `INSERT INTO roles (title, salary, departments_id)
            VALUES (?,?,?)`
            const params = [role, salary, departId]

            db.promise().query(sql, params)
                .then(() => {
                    console.log('Role has been added');
                })
                .catch((err) => {
                    console.log(err.message);
                })
                .then(() => welcome())
        })
}

function getChoices() {
    db.promise().query(`SELECT * FROM departments`)
        .then(([rows, fields]) => {
            addRole(rows);
        })
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type:'input',
            name:'firstName',
            message:"Please enter the employee's first name",
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
            type:'input',
            name:'lastName',
            message:"Please enter the employee's last name",
            validate: value => {
                if (value) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name!");
                    return false;
                }
            }
        }
    ])
}

function updateEmployee() {
    console.log('update employee');
    welcome();
}

welcome();