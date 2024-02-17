// Dynamically import the inquirer module
let inquirer;

async function importInquirer() {
  inquirer = (await import('inquirer')).default;
}

// Import other necessary modules using require
const Department = require('../lib/Department');
const Role = require('../lib/Role');
const Employee = require('../lib/Employees');
const db = require('../config/connection');

// Instantiate your classes with the database connection
const department = new Department(db);
const role = new Role(db);
const employee = new Employee(db);

async function mainPrompt() {
  if (!inquirer) {
    await importInquirer();
  }

  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    }
  ]).then((answer) => {
    switch (answer.action) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
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
        updateEmployeeRole();
        break;
      case 'Exit':
        db.end();
        break;
    }
  });
}

function viewAllDepartments() {
  department.viewAllDepartments().then(() => mainPrompt());
}

function viewAllRoles() {
  role.viewAllRoles().then(() => mainPrompt());
}

function viewAllEmployees() {
  employee.viewAllEmployees().then(() => mainPrompt());
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?'
    }
  ]).then((answer) => {
    department.addDepartment(answer.name).then(() => mainPrompt());
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'What is the department ID?'
    }
  ]).then((answer) => {
    role.addRole(answer.title, answer.salary, answer.departmentId).then(() => mainPrompt());
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?"
    },
    {
      type: 'input',
      name: 'roleId',
      message: "What is the employee's role ID?"
    },
    {
      type: 'input',
      name: 'managerId',
      message: "What is the employee's manager's ID? (Press Enter if none)"
    }
  ]).then((answer) => {
    employee.addEmployee(answer.firstName, answer.lastName, answer.roleId, answer.managerId || null).then(() => mainPrompt());
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: "Which employee's role do you want to update? (Enter the Employee ID)"
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: "What is the new role ID?"
    }
  ]).then((answer) => {
    employee.updateEmployeeRole(answer.employeeId, answer.newRoleId).then(() => mainPrompt());
  });
}

// Start the application
mainPrompt().catch((err) => {
  console.error('An error occurred while starting the application:', err);
  db.end();
});
