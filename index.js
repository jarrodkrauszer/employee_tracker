const inquirer = require('inquirer');
const db = require('./db/connection');
const DatabaseQueryManager = require('./lib/DatabaseQueryManager');
require('colors');
require('console.table');

let departmentList = [];
let roleList = [];
let managerList = [];
let managerOptionNoneList = [];
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
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update Employee Managers', 'View Employees by Manager', 'View Employees by Department', 'View Budget by Department', 'Delete a Department', 'Delete a Role', 'Delete a Employee', 'Quit']
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
        case 'Update Employee Managers':
          updateEmployeeManager();
          break;
        case 'View Employees by Manager':
          viewByManager();
          break;
        case 'View Employees by Department':
          viewByDepartment();
          break;
        case 'View Budget by Department':
          viewBudgetByDepartment();
          break;
        case 'Delete a Department':
          deleteDepartment();
          break;
        case 'Delete a Role':
          deleteRole();
          break;
        case 'Delete a Employee':
          deleteEmployee();
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
        choices: managerOptionNoneList
      }
    ]).then((answer) => {
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

function updateEmployeeManager() {
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
      message: 'Who is the employee\'s new manager?',
      choices: managerList
    }
   ]).then((answer) => {
    queryDB.updateEmployeeManager(answer.name, answer.role_id)
      .then(() => {
        startApp();
      });
   });
}

function viewByManager() {
  inquirer
   .prompt([
    {
      name: 'name',
      type: 'list',
      message: 'Please select a manager.',
      choices: managerList
    }
   ]).then((answer) => {
    queryDB.queryByManager(answer.name)
      .then(([rows]) => {
        console.table(rows);
        startApp();
      });
   });
}

function viewByDepartment() {
  inquirer
   .prompt([
    {
      name: 'name',
      type: 'list',
      message: 'Please select a manager.',
      choices: departmentList
    }
   ]).then((answer) => {
    queryDB.queryByDepartment(answer.name)
      .then(([rows]) => {
        console.table(rows);
        startApp();
      });
   });
}

function viewBudgetByDepartment() {
  inquirer
   .prompt([
    {
      name: 'name',
      type: 'list',
      message: 'What department would you like to see the budget for?',
      choices: departmentList
    }
   ]).then((answer) => {
    queryDB.queryBudgetByDepartment(answer.name)
      .then(([rows]) => {
        console.table(rows);
        startApp();
      });
   });
}

function deleteDepartment() {
  inquirer
   .prompt([
    {
      name: 'name',
      type: 'list',
      message: 'What department would you like to delete?',
      choices: departmentList
    }
   ]).then((answer) => {
    queryDB.deleteDepartment(answer.name)
      .then(([rows]) => {
        populateDepartmentList();
        startApp();
      });
   });
}

function deleteRole() {
  inquirer
   .prompt([
    {
      name: 'name',
      type: 'list',
      message: 'What role would you like to delete?',
      choices: roleList
    }
   ]).then((answer) => {
    queryDB.deleteRole(answer.name)
      .then(([rows]) => {
        populateRoleList();
        startApp();
      });
   });
}

function deleteEmployee() {
  inquirer
   .prompt([
    {
      name: 'name',
      type: 'list',
      message: 'What employee would you like to delete?',
      choices: employeeList
    }
   ]).then((answer) => {
    queryDB.deleteEmployee(answer.name)
      .then(([rows]) => {
        populateEmployeeList();
        startApp();
      });
   });
}

function populateDepartmentList() {
  queryDB.queryAllDepartments()
    .then(([rows]) => {
      departmentList = rows.map(row => ({name: row.name, value: row.id}));
    });
}

function populateRoleList() {
  queryDB.queryAllRoles()
    .then(([rows]) => {
      roleList = rows.map(row => ({name: row.title, value: row.id}));
    });
}

function populateManagerList() {
  queryDB.queryManagers()
    .then(([rows]) => {
      managerList = rows.map(person => ({name: `${person.first_name} ${person.last_name}`, value: person.id}));
      managerOptionNoneList = managerList.slice();
      managerOptionNoneList.unshift({name: 'None', value: null});
    });
}

function populateEmployeeList() {
  queryDB.queryAllEmployees()
    .then(([rows]) => {
      employeeList = rows.map(row => ({name: `${row.first_name} ${row.last_name}`, value: row.id}));
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