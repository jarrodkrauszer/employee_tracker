const inquirer = require('inquirer');
const db = require('./db/connection');
const DatabaseQueryManager = require('./lib/DatabaseQueryManager');
require('colors');
require('console.table');

let departmentList = [];
let roleList = [];
let managerList = [];
let employeeList = [];
let queryDB;

const validateText = (input) => {
  if(!input)
    return 'Please enter a valid response.'.red;

  return true;
};

const validateNumber = (input) => {
  if (isNaN(input))
    return 'Please enter a valid number.'.red;

  return true;
}

function startApp() {
  inquirer
    .prompt([
      {
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']
      }
    ]).then((answer) => {
      if (answer.start === 'Quit') {
        db.end();
        return;   
      }
      
      switch (answer.start) {
        case 'View All Departments':
          queryDB.queryAllDepartments()
            .then(([rows]) => {
              console.table(rows);
              startApp();
            });
          break;
        case 'View All Roles':
          queryDB.queryAllRoles()
            .then(([rows]) => {
              console.table(rows);
              startApp();
            });
          break;
        case 'View All Employees':
          queryDB.queryAllEmployees()
            .then(([rows]) => {
              console.table(rows);
              startApp();
            });
          break;
        case 'Add a Department':
          addNewDepartment();
          break;
        case 'Add a Role':
          addNewRole();
          break;
        case 'Add an Employee':
          addNewEmployee();
          break;
        case 'Update an Employee Role':
          updateEmployee();
          break;
      }
     
    })
    
}

function addNewDepartment() {
  inquirer
   .prompt([
    {
      name: 'name',
      message: 'What is the name of the department',
      validate: validateText
    }
   ]).then((answer) => {
    queryDB.addDepartment(answer)
      .then(() => {
        populateDepartmentList()
        startApp();
      });
   });
}

function addNewRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        message: 'What is the name of the role?',
        validate: validateText
      },
      {
        name: 'salary',
        type: 'number',
        message: 'What is the salary of the role?',
        validate: validateNumber
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'Which department does the role belong too?',
        choices: departmentList
      }
    ]).then((answer) => {
      
      queryDB.addRole(answer)
        .then(() => {
          populateRoleList()
          startApp();
        });
    })
}

function addNewEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        message: 'What is the employee\'s first name?',
        validate: validateText
      },
      {
        name: 'last_name',
        message: 'What is the employee\'s last name?',
        validate: validateText
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'What is the employee\'s role?',
        choices: roleList
      },
      {
        name: 'manager_id',
        type: 'list',
        message: 'Who is the employee\'s manager',
        choices: managerList
      }
    ]).then((answer) => {
      console.log(answer);
      queryDB.addEmployee(answer);
      populateManagerList();
      startApp();
    });
}

function updateEmployee() {
  inquirer
   .prompt([
    {
      name: 'name',
      type: 'list',
      message: 'Which employee would you like to update?',
      choices: employeeList
    },
    {
      name: 'role_id',
      type: 'list',
      message: 'What new role would you like to assign?',
      choices: roleList
    }
   ]).then((answer) => {
    queryDB.updateEmployee(answer.name, answer.role_id)
      .then(() => {
        populateEmployeeList()
        startApp();
      });
   });
}

function populateDepartmentList() {
  queryDB.queryAllDepartments()
    .then(([rows]) => {
      departmentList = rows.map((row) => ({name: row.name, value: row.id}));
    });
}

function populateRoleList() {
  queryDB.queryAllRoles()
    .then(([rows]) => {
      roleList = rows.map((row) => ({name: row.title, value: row.id}));
    });
}

function populateManagerList() {
  queryDB.queryManagers()
    .then(([rows]) => {
      managerList = rows.map(person => ({name: `${person.first_name} ${person.last_name}`, value: person.id}));
    });
}

function populateEmployeeList() {
  queryDB.queryAllEmployees()
    .then(([rows]) => {
      employeeList = rows.map(person => ({name: `${person.first_name} ${person.last_name}`, value: person.id}));
    });
}

function init() {
  queryDB = new DatabaseQueryManager(db);
  populateDepartmentList();
  populateRoleList();
  populateManagerList();
  populateEmployeeList();
  startApp();
}

init();