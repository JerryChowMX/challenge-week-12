const mysql = require('mysql2/promise');
const db = require('../config/connection');

class Database {
  constructor(config) {
    this.connection = mysql.createPool(config);
  }

  async query(sql, params) {
    const [rows, fields] = await this.connection.query(sql, params);
    return rows;
  }

  async close() {
    await this.connection.end();
  }

  // Add methods for specific operations
  // Example: Viewing all departments
  async viewAllDepartments() {
    return this.query('SELECT * FROM department');
  }

  // Example: Adding a new department
  async addDepartment(name) {
    return this.query('INSERT INTO department (name) VALUES (?)', [name]);
  }

  // Example: Viewing all roles
  async viewAllRoles() {
    return this.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id');
  }

  // Example: Adding a new role
  async addRole(title, salary, departmentId) {
    return this.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  }

  // Example: Viewing all employees
  async viewAllEmployees() {
    return this.query(`
      SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
      FROM 
        employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
  }

  // Example: Adding a new employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    return this.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  }

  // Example: Updating an employee's role
  async updateEmployeeRole(employeeId, newRoleId) {
    return this.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
  }
}

module.exports = Database;
