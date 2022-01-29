const db = require('../db/connection');
const inquirer = require('inquirer');

//Function to view a table of all departments
function viewDepartments() {
    return db.promise().query(`SELECT * FROM departments`)
        .then(([rows, fields]) => {
            console.table(rows)
        })
        .catch((err) => {
            console.log(err.message);
        })
}

//Function to ask for name of new department to add
function addDepartment() {
    return inquirer
        .prompt(
            {
                type: 'input',
                name: 'department',
                message: 'Please enter the name of the department you would like to add.',
                validate: value => {
                    if (value && value.length <= 30) {
                        return true;
                    } else if(value.length > 30) {
                        console.log("Please enter a department name with 30 or less characters");
                        return false;
                    } else {
                        console.log("Please enter a department name!");
                        return false;
                    }
                }
            })
}

//Function to insert new department
function insertDepartment(department) {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const param = [department];

    return db.promise().query(sql, param)
        .then(() => {
            console.log('Department has been added');
        })
        .catch((err) => {
            console.log(err.message);
        })
}

//Function to get all department choices
function getDepartmentChoices() {
    return db.promise().query(`SELECT * FROM departments`)
        .then(([rows, fields]) => {
            return rows
        })
}

//Function to get department id
function getDepartmentId(name) {
    const sql = `SELECT id FROM departments WHERE name = ?`
    const params = [name] 
    return db.promise().query(sql, params)
        .then(([rows, fields]) => {
            return rows[0].id;
        })
} 

//Function to select which department to delete from database
function selectDeleteDepartment(departmentNames) {
    return inquirer
        .prompt(
            {
                type: 'list',
                name: 'departDelete',
                message: 'Select which department you would like to delete from the list below.',
                choices: departmentNames
            }
        )
}

//Function to delete department from database departments table
function deleteDepartment(departId) {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = departId;

    return db.promise().query(sql, params)
        .then(() => {
            console.log('Department has been deleted.');
        })
        .catch((err) => {
            console.log(err.message);
        })
}

module.exports = { viewDepartments, addDepartment, insertDepartment, getDepartmentChoices, getDepartmentId, selectDeleteDepartment, deleteDepartment }