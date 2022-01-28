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
            //console.log(rows)
            return rows[0].id;
        })
} 

module.exports = { viewDepartments, addDepartment, insertDepartment, getDepartmentChoices, getDepartmentId }