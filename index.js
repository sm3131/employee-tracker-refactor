const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const { viewDepartments, addDepartment, insertDepartment, getDepartmentChoices, getDepartmentId } = require('./SQL-queries/departments')
const { viewRoles, addRole, insertRole, getRoleTitles, getRoleId } = require('./SQL-queries/roles')
const { viewEmployees, getEmployeeNames, addEmployee, getEmployeeId, updateEmployee, insertUpdatedEmployee } = require('./SQL-queries/employees')

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
                addDepartment()
                    .then(value => {
                        const departmentName = value.department
                        insertDepartment(departmentName)
                            .then(() => welcome())
                    })
            } else if (trackerOptions === 'Add a role') {
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
            } else if (trackerOptions === 'Add an employee') {
                roleTitles = []
                namesArr = ['null']
                getRoleTitles()
                    .then(roles => {
                        createRolesArr(roles)
                        //console.log(roleTitles);
                    })
                getEmployeeNames()
                    .then(names => {
                        createNamesArr(names);
                        //createManagersArr(names)
                        //console.log(managersArr)
                    })
                addEmployee(roleTitles, namesArr)
                    .then(value => {
                        //console.log(value);
                        getEmployeeParams(value);
                    })
            } else if (trackerOptions === 'Update an employee role') {
                //employeeNamesArr = [];
                getEmployeeNames()
                    .then(names => {
                        createEmployeeNamesArr(names)
                        //console.log(employeeNamesArr)
                    })
                getRoleTitles()
                    .then(roles => {
                        createRolesArr(roles)
                        //console.log(roleTitles);
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
                            //console.log(updateParams)
                            insertUpdatedEmployee(updateParams)
                            .then(() => welcome())
                        })
                    })
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

// function updateEmployee(employeesArr, rolesArr) {
//     inquirer
//         .prompt([
//             {
//                 type: 'list',
//                 name: 'employee',
//                 message: 'Select an employee from the list below to update their role.',
//                 choices: employeesArr
//             },
//             {
//                 type: 'list',
//                 name: 'newRole',
//                 message: "Please select the employee's new role from the list of roles below.",
//                 choices: rolesArr
//             }
//         ])
//         .then(value => {
//             let employeeChoice = value.employee;
//             let roleChoice = value.newRole;
//             let updateParams = [];

//             db.query(`SELECT * FROM roles`, function (err, results) {
//                 getRoleInfo(results);
//             })

//             function getRoleInfo(rolesArr) {
//                 let roleIdArr = rolesArr.filter(getRoleId);
//                 let roleId = roleIdArr[0].id;
//                 function getRoleId(item) {
//                     if (item.title === roleChoice) {
//                         return item
//                     }
//                 }
//                 updateParams.push(roleId);
//             }

//             db.query(`SELECT * FROM employees`, function (err, results) {
//                 getEmployeeInfo(results)
//             })

//             function getEmployeeInfo(employeesArr) {
//                 let employeeIdArr = employeesArr.filter(getEmployeeId);
//                 let employeeId = employeeIdArr[0].id;
//                 function getEmployeeId(item) {
//                     if (item.first_name + " " + item.last_name === employeeChoice) {
//                         return item
//                     }
//                 }
//                 updateParams.push(employeeId);
//                 insertUpdatedEmployee(updateParams);
//             }
//         })

//     function insertUpdatedEmployee(empParams) {
//         const sql = `UPDATE employees SET roles_id = ? WHERE id = ?`;
//         const params = empParams;

//         db.promise().query(sql, params)
//             .then(() => {
//                 console.log('Employee role has been updated.');
//                 employeeParams = [];
//             })
//             .catch((err) => {
//                 console.log(err.message);
//             })
//             .then(() => welcome())
//     }
// }

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

welcome();