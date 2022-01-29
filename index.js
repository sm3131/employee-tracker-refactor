const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const { viewDepartments, addDepartment, insertDepartment, getDepartmentChoices, getDepartmentId } = require('./SQL-queries/departments')
const { viewRoles, addRole, insertRole, getRoleTitles, getRoleId } = require('./SQL-queries/roles')
const { viewEmployees, getEmployeeNames, addEmployee, getEmployeeId, updateEmployee, insertUpdatedEmployee } = require('./SQL-queries/employees');
const ConfirmPrompt = require('inquirer/lib/prompts/confirm');

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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Delete Department', 'Leave application']
        })
        .then(({ trackerOptions }) => {
            if (trackerOptions === 'View all departments') {
                viewDepartments()
                    .then(() => welcome())
            } else if (trackerOptions === 'View all roles') {
                viewRoles()
                    .then(() => welcome())
            } else if (trackerOptions === 'View all employees') {
                viewEmployees()
                    .then(() => welcome())
            } else if (trackerOptions === 'Add a department') {
                confirmChoice()
                    .then(answer => {
                        if (answer.choiceCheck === false) {
                            welcome();
                        } else {
                            addDepartment()
                                .then(value => {
                                    const departmentName = value.department
                                    insertDepartment(departmentName)
                                        .then(() => welcome())
                                })
                        }
                    })
            } else if (trackerOptions === 'Add a role') {
                confirmChoice()
                    .then(answer => {
                        if (answer.choiceCheck === false) {
                            welcome();
                        } else {
                            getDepartmentChoices()
                                .then(departments => addRole(departments)
                                    .then(newRole => {
                                        let role = newRole.roleName;
                                        let salary = newRole.roleSalary;
                                        let roleDepart = newRole.roleDepartment;

                                        getDepartmentId(roleDepart)
                                            .then(id => {
                                                let departId = id

                                                insertRole(role, salary, departId)
                                                    .then(() => welcome())
                                            })
                                    }
                                    ))
                        }
                    })
            } else if (trackerOptions === 'Add an employee') {
                confirmChoice()
                    .then(answer => {
                        if (answer.choiceCheck === false) {
                            welcome();
                        } else {
                            roleTitles = []
                            namesArr = ['null']
                            getRoleTitles()
                                .then(roles => {
                                    createRolesArr(roles)
                                })
                            getEmployeeNames()
                                .then(names => {
                                    createNamesArr(names);
                                })
                            addEmployee(roleTitles, namesArr)
                                .then(value => {
                                    getEmployeeParams(value);
                                })
                        }
                    })
            } else if (trackerOptions === 'Update an employee role') {
                confirmChoice()
                    .then(answer => {
                        if (answer.choiceCheck === false) {
                            welcome();
                        } else {
                            getEmployeeNames()
                            .then(names => {
                                createEmployeeNamesArr(names)
                            })
                        getRoleTitles()
                            .then(roles => {
                                createRolesArr(roles)
                            })
                            .then(() => {
                                updateEmployee(employeeNamesArr, roleTitles)
                                    .then(value => {
                                        let employeeName = value.employee;
                                        let employeeArr = employeeName.split(" ");
                                        let employeeFirst = employeeArr[0]
                                        let employeeLast = employeeArr[1];
                                        let roleChoice = value.newRole;
                                        let updateParams = [];
        
                                        getRoleId(roleChoice)
                                            .then(roleId => {
                                                updateParams.push(roleId)
                                            })
                                        getEmployeeId(employeeFirst, employeeLast)
                                            .then(employeeId => {
                                                updateParams.push(employeeId);
                                                insertUpdatedEmployee(updateParams)
                                                    .then(() => welcome())
                                            })
                                    })
                            })
                        }
                    })
            } else if (trackerOptions === 'Delete Department') {
                departmentsInfo = [];
                departmentArr = [];
                findDepartments()
                    .then(() => {
                        whichDepartment(departmentArr);
                    })
            }
            else if (trackerOptions === 'Leave application') {
                console.log('Have a Great Day!');
                process.exit();
            }
        })
}

let roleTitles = []
function createRolesArr(roles) {
    roles.forEach(obj => {
        roleTitles.push(obj.title)
    })
}

let namesArr = ['null']
function createNamesArr(names) {
    names.forEach(obj => {
        fullName = obj.first_name + " " + obj.last_name
        namesArr.push(fullName)
    })
}

let employeeNamesArr = []
function createEmployeeNamesArr(names) {
    names.forEach(obj => {
        fullName = obj.first_name + " " + obj.last_name
        employeeNamesArr.push(fullName)
    })
}

let employeeParams = []
function getEmployeeParams(value) {
    let firstName = value.firstName;
    let lastName = value.lastName;
    let role = value.employeeRole;

    employeeParams.push(firstName, lastName)

    if (!value.employeeManager === 'null') {
        let managerName = value.employeeManager
        let managerArr = managerName.split(" ");
        let managerFirst = managerArr[0]
        let managerLast = managerArr[1];

        getRoleId(role)
            .then(id => {
                let roleId = id;
                employeeParams.push(roleId);
                //console.log(employeeParams);
            })

        getEmployeeId(managerFirst, managerLast)
            .then(manId => {
                let managerId = manId;
                employeeParams.push(managerId);
                //console.log(employeeParams);
                insertEmployee(employeeParams);
            })
    } else {
        getRoleId(role)
            .then(id => {
                let roleId = id;
                employeeParams.push(roleId);
                //console.log(employeeParams);
                insertEmployeeNoManager(employeeParams);
            })
    }
}

function insertEmployee(employeeParams) {
    const sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
    VALUES (?,?,?,?)`
    const params = employeeParams

    db.promise().query(sql, params)
        .then(() => {
            console.log('Employee has been added');
            employeeParams = [];
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then(() => welcome())
}

function insertEmployeeNoManager(employeeParams) {
    console.log(employeeParams);
    const sql = `INSERT INTO employees (first_name, last_name, roles_id)
    VALUES (?,?,?)`
    const params = employeeParams

    db.promise().query(sql, params)
        .then(() => {
            console.log('Employee has been added');
            employeeParams = [];
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then(() => welcome())
}

let departmentsInfo = []
function findDepartments() {
    return db.promise().query(`SELECT * FROM departments`)
        .then(([rows, fields]) => {
            createDepartmentArr(rows);
        })
}

let departmentArr = []
function createDepartmentArr(departments) {
    let depArr = departments.forEach(obj => {
        departmentArr.push(obj.name);
        departmentsInfo.push(obj);
    })
}

function whichDepartment(departmentNames) {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'departDelete',
                message: 'Select which department you would like to delete from the list below.',
                choices: departmentNames
            }
        )
        .then(value => {
            // console.log(value.departDelete);
            let departChoice = value.departDelete
            //console.log(departmentsInfo)
            let departmentIdArr = departmentsInfo.filter(getDepartId);
            let departmentId = departmentIdArr[0].id

            function getDepartId(item) {
                if (item.name === departChoice) {
                    return item;
                }
            }
            deleteDepartment(departmentId);
        })
}

function deleteDepartment(departId) {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = departId;

    db.promise().query(sql, params)
        .then(() => {
            console.log('Department has been deleted.');
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then(() => welcome())

}

function confirmChoice() {
    return inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'choiceCheck',
                message: 'If you want to return to the main menu type no(n), if you want to continue to the prompt you chose type yes(y).'
            }
        ])
}

welcome();
