// const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
//const mysql = require('mysql2');

// Connect to database
db.connect(err => {
    if (err) throw err;
    //console.log('Database connected.');
});

console.log('Welcome to the Employee Tracker Application! With this app you can view and manage both your company and employee information. Answer the prompt below to get started.');

function welcome() {
    inquirer
    .prompt({
            type: 'list',
            name: 'trackerOptions',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'Leave application']
        })
        .then (({ trackerOptions }) => {
            if(trackerOptions === 'View all departments') {
                viewDepartments();
            } else if(trackerOptions === 'View all roles') {
                viewRoles();
            } else if(trackerOptions === 'View all employees') {
                viewEmployees();
            } else if(trackerOptions === 'Add a department') {
                addDepartment();
            } else if(trackerOptions === 'Add a role') {
                addRole();
            } else if (trackerOptions === 'Add an employee') {
                addEmployee();
            } else if(trackerOptions === 'Update an employee') {
                updateEmployee();
            } else if (trackerOptions === 'Leave application') {
                console.log('Have a Great Day!');
                process.exit();
            }
        })
}

function viewDepartments() {
    db.query(`SELECT * FROM departments`, (err, results) => {
        if(err) {
            console.log(err);
        }
        console.log(results);
    })
    welcome();
}

function viewRoles() {
    console.log('view roles');
    welcome();
}

function viewEmployees() {
    console.log('view employees');
    welcome();
}

function addDepartment() {
    console.log('add departments');
    welcome();
}

function addRole() {
    console.log('add role');
    welcome();
}

function addEmployee() {
    console.log('add employee');
    welcome();
}

function updateEmployee() {
    console.log('update employee');
    welcome();
}

welcome();