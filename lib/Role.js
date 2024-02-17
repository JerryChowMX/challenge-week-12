const Database = require('./Database'); // Make sure the path matches your project structure

class Role {
  constructor(database) {
    this.db = database;
  }

  // View all roles
  async viewAllRoles() {
    try {
      const roles = await this.db.viewAllRoles();
      console.table(roles);
    } catch (err) {
      console.error("Error viewing all roles: ", err.message);
    }
  }

  // Add a new role
  async addRole(title, salary, departmentId) {
    try {
      await this.db.addRole(title, salary, departmentId);
      console.log(`Added new role: ${title}`);
    } catch (err) {
      console.error("Error adding new role: ", err.message);
    }
  }
}

module.exports = Role;
