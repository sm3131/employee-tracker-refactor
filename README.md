# Employee-tracker

[![License Badge](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

## Description

The Employee Tracker application was created to allow users to manage company databases. This application is run in the node.js environment, and using the command line, users can follow prompts to view, manage, and update their company information. The employee tracker contains a central company database with various tables containing departments, roles, and employees. Each table in the database can be viewed and managed, depending on what users chooses. For example the user can view each table, add to each table, update table information, or delete table information. 

## Table of Contents
  * [Built With](#built-with)
  * [Code Access](#code-access)
  * [Preview](#preview)
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Questions](#questions)
  * [Credits](#credits)

## Built With

The Employee Tracker application was built with:
- JavaScript
- Node.js
- npm
- Inquirer
- mySQL
- mySQL2
- console.table

## Code Access

If you would like to access the code for this application, please visit [GitHub](https://github.com/sm3131/employee-tracker-refactor)

## Preview

Click on the link below to watch the Screencastify video that walks the user through proper usage of the application:


Employee Tracker application viewed from the command line:
![employee-tracker](./src/images/)

## Installation
To install the Employee Tracker application complete the following steps:
1. Clone the application's code from this [GitHub](https://github.com/sm3131/employee-tracker-refactor) repository onto your local machine into a new directory (e.g. employee-tracker).
2. Open the command line and navigate to the directory you cloned this repository into, then open the content in a code text editor. You should now see the main files and folders for this project (index.js, /db, /lib, /SQL-queries, package.json).
3. Next check to see if you have node.js installed on your machine by running the command *node -v* in your command line.
4. If you have node.js make sure your version is up to date by going to this website (https://nodejs.org/en/).
5. If you do not have node.js installed follow the installation steps on this website (https://nodejs.org/en/).
6. Once you have node.js installed, make sure you are still in the employee tracker directory in the command line, and then run the following command *npm install* to install the required packages and dependencies to run the application.
7. Next you will need to either install or make sure you have mysql installed on your machine. MySQL will allow you to generate and seed the employee tracker database locally.
8. To check if you have mysql installed run the command *mysql -v*, this should provide you with the current mysql version you have installed, if you are not provided with the mysql version information then you can follow the installation steps for installing mysql by visiting this website (https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/installing.html).
9. Once you have installed mysql on your local machine enter into the mysql shell by running the command *mysql -u username -p* (enter your username in pace of username), then you should be prompted to enter your mysql password.
10. Once you are in the mysql shell you should see mysql> in the command line where you will enter in your commands.
11. Then to create the database run *source db/db.sql*, then run *USE company* to use the company database, then run *source db/schema.sql* to create the tables, and lastly run *source db/seeds.sql* to seed the tables with starter data.   
12. After you have node.js and the required npm dependencies installed and you have installed mysql and created the database with seeded tables, you are ready to run the application via node.js using the command line.

## Usage
To use the employee tracker application complete the following steps:
1. The purpose of this application is to view and manage your company's database. If you followed the above installation steps you will have created a starter database, with example tables, and seeds data. This will allow you to initially see how the application works, but once you understand it's functionality you will have the ability to update and changes various aspects of the database information. 
2. After you have completed all of the above installation steps, you can now either test the application to see how it works and what the prompts ask, or you can jump right into adding your own company data.
3. To begin running the application in the command line, type *node index.js* and this will start the program.
4. If the program is running properly you should be confronted with some initial intro text and the first user prompt asking what you would like to do.
5. There are a variety of options to view and manage various components of your company database, so choose the options that fulfill your needs.
6. For example if you are using the application to view your database information you can choose the "View All Departments", "View All Roles", or "View All Employees" options. Any of these options will present you with a nicely formatted table of information for the corresponding category you chose.
7. If you want to add database information, you can choose to either "Add a Department", Add a Role", or "Add an Employee". All of these option will present you with prompts to either enter or select information for each category. For example when adding a new role you will be asked to enter the role name, role salary, and select which department the role belongs to, when complete the application will notify you that a role has been added and you can view this addition by selecting "View All Roles"
8. If you want to update an employee's role choose the "Update and Employee Role" option and you can then select which employee to update and the role you want to change.
9. If you want to delete any data you have the option to either "Delete a Department", "Delete a Role", or "Delete an Employee". All of these options will provide you with a current list of data from the selected category, and you can choose which data to delete permanently from the database.
10. If you are finished using the application, you can select the "Leave Application" option to exit the app and carry on with your day. 

**IMPORTANT NOTE:** Deleting a department, role, or employee will permanently delete this data from the database. You can always manually enter this data back into the database if you accidentally delete an entry you meant to keep in the database.

## License

MIT License

Copyright (c) 2022 Sammi Moore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Questions

If you would like to access this project's repository as well as other projects in my GitHub, click this [GitHub](https://github.com/sm3131) link. 

For all other questions or inquires please feel free to contact me via email at [sm2683@nau.edu](mailto:sm2683@nau.edu)

## Credits

All of the code for this project was written by myself, Sammi Moore. I wrote, organized, and modularized all of the code for this employee tracker application. The database, schema, and seeds files were also created by myself in order to generate a working database to show how this application functions. 

The resources that I used for this project are as follows:
- The inquirer package from npm in this node.js application in order to generate user prompt questions (https://www.npmjs.com/package/inquirer)
- The mysql2 package to use mysql queries in my application (https://www.npmjs.com/package/mysql2#using-prepared-statements)
- The console.table package to create nicely formatted tables of database data and information(https://www.npmjs.com/package/console.table)
- https://opensource.org/licenses/ (To borrow the license section text describing the terms of each of the licenses included in the readme)
- https://shields.io/ (To generate the link to create the license badge)

For the license badges and license section of the readme, I used the following resources:
- https://choosealicense.com/ (To help with picking which licenses to include)
- https://shields.io/ (To generate the link to create the license badge)
- https://wisehackermonkey.github.io/badge-demo/ (To help with coloring the license badges and grabbing the license links)
- https://opensource.org/licenses/ (To borrow the license section text describing the terms of each of the licenses included in the readme)
