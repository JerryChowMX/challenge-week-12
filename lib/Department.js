const Database = require('./Database'); // Adjust the path as necessary

class Department {
  constructor(database) {
    this.db = database;
  }

  // View all departments
  async viewAllDepartments() {
    try {
      const departments = await this.db.viewAllDepartments();
      console.table(departments);
    } catch (err) {
      console.error("Error viewing all departments: ", err.message);
    }
  }

  // Add a new department
  async addDepartment(name) {
    try {
      await this.db.addDepartment(name);
      console.log(`Added new department: ${name}`);
    } catch (err) {
      console.error("Error adding new department: ", err.message);
    }
  }
}

module.exports = Department;
