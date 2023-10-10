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
          console.log('Add a Department');
          break;
        case 'Add a Role':
          console.log('Add a Role');
          break;
        case 'Add an Employee':
          console.log('Add an Employee');
          break;
        case 'Update an Employee Role':
          console.log('Update an Employee Role');
          break;
      }
    })
}


startApp();