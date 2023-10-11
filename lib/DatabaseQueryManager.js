class DatabaseQueryManager {
  constructor(db) {
    this.db = db;
  }

  queryAllDepartments() {
   return this.db.promise().query('SELECT * FROM department');
  }

  queryAllRoles() {
    return this.db.promise().query('SELECT * FROM role');
  }

  queryAllEmployees() {
    return this.db.promise().query('SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON d.id = r.department_id LEFT JOIN employee managers ON e.manager_id = managers.id ORDER BY e.id;');
  }

  queryDepartmentId(name) {
    return this.db.promise().query('SELECT id FROM department WHERE name=?', [name]);
  }

  queryManagers() {
    return this.db.promise().query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');
  }
  queryByManager(name) {
    console.log('Manager: ' + name);
    return this.db.promise().query('SELECT * FROM employee WHERE manager_id=?', [name]);
  }

  queryByDepartment(name) {
    console.log('Manager: ' + name);
    return this.db.promise().query('SELECT * FROM employee WHERE manager_id=?', [name]);
  }

  addDepartment(department) {
    return this.db.promise().query('INSERT INTO department SET ?', [department]);
  }

  addRole(role) {
    return this.db.promise().query('INSERT INTO role SET ?', [role]);
  }

  addEmployee(employee) {
    return this.db.promise().query('INSERT INTO employee SET ?', [employee]);
  }

  updateEmployee(name, role_id) {
    return this.db.promise().query('UPDATE employee SET role_id=? WHERE id=?', [role_id, name]);
  }

  updateEmployeeManager(name, manager_id) {
    return this.db.promise().query('UPDATE employee SET manager_id=? WHERE id=?', [manager_id, name]);
  }
}

module.exports = DatabaseQueryManager;