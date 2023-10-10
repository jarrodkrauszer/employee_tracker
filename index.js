const inquirer = require('inquirer');
const colors = require('colors');

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
        return;   
      }
      
      switch (answer.start) {
        case 'View All Departments':
          console.log('View All Department');
          break;
        case 'View All Roles':
          console.log('View All Roles');
          break;
        case 'View All Employees':
          console.log('View All Employees');
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Update an Employee Role':
          console.log('Update an Employee Role');
          break;
      }
    })
}

function addDepartment() {
  inquirer
   .prompt([
    {
      name: 'department',
      message: 'What is the name of the department'
    }
   ]).then((answer) => {
    console.log(answer);
   });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'role',
        message: 'What is the name of the role?'
      },
      {
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        name: 'belongsTo',
        message: 'Which department does the role belong too?'
      }
    ]).then((answer) => {
      console.log(answer);
    })
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        message: 'What is the employee\'s first name?'
      },
      {
        name: 'lastName',
        message: 'What is the employee\'s last name?'
      },
      {
        name: 'role',
        type: 'list',
        message: 'What is the employee\'s last name?',
        choices: roleArray
      },
      {
        name: 'manager',
        type: 'list',
        message: 'Who is the employee\'s manager',
        choices: managerArray
      }
    ]).then((answer) => {
      console.log(answer);
    });
}


startApp();