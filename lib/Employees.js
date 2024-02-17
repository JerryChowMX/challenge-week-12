const Database = require('./Database'); // Ensure the path is correct based on your project structure

class Employee {
  constructor(database) {
    this.db = database;
  }

  // View all employees
  async viewAllEmployees() {
    try {
      const employees = await this.db.viewAllEmployees();
      console.table(employees);
    } catch (err) {
      console.error("Error viewing all employees: ", err.message);
    }
  }

  // Add a new employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      await this.db.addEmployee(firstName, lastName, roleId, managerId);
      console.log(`Added new employee: ${firstName} ${lastName}`);
    } catch (err) {
      console.error("Error adding new employee: ", err.message);
    }
  }

  // Update an employee's role
  async updateEmployeeRole(employeeId, newRoleId) {
    try {
      await this.db.updateEmployeeRole(employeeId, newRoleId);
      console.log(`Updated employee's role. Employee ID: ${employeeId}, New Role ID: ${newRoleId}`);
    } catch (err) {
      console.error("Error updating employee's role: ", err.message);
    }
  }
}

module.exports = Employee;
