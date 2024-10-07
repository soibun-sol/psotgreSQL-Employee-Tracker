import inquirer from 'inquirer';
import pool from './db';

export async function viewAllDepartments() {
    try {
        const res = await pool.query('SELECT * FROM department');
        console.table(res.rows);
    } catch (err) {
        console.error('cannot view departments', err);
    }
}

export async function viewAllRoles() {
    try {
        const res = await pool.query(`SELECT 
        role.id,role.title,role.salary,department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id`
        );
        console.table(res.rows);
    } catch (err) {
        console.error('cannot view roles', err);
    }
}

export async function viewAllEmployees() {
    try {
        const res = await pool.query(`SELECT 
            employee.id,employee.first_name,employee.last_name,role.title AS role,role.salary,department.name AS department,
            CONCAT(manager.first_name,' ',manager.last_name) AS manager
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id`);
        console.table(res.rows);
    } catch (err) {
        console.error('cannot view employees', err);

    }
}

export async function addDepartment() {
    try {
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
        }
      ]);
      await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
      console.log(`Added department: ${name}`);
    } catch (err) {
      console.error('Error adding department:', err);
    }
  }

  export async function addRole() {
    try {
      const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:',
        }
      ]);
      await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
      console.log(`Added role: ${title}`);
    } catch (err) {
      console.error('Error adding role:', err);
    }
  }
  
  export async function addEmployee() {
    try {
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the manager ID for the employee (leave blank if no manager):',
        }
      ]);
      await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
        [firstName, lastName, roleId, managerId || null]);
      console.log(`Added employee: ${firstName} ${lastName}`);
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  }
  
  export async function updateEmployeeRole() {
    try {
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the new role ID for the employee:',
        }
      ]);
      await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
      console.log(`Updated employee's role`);
    } catch (err) {
      console.error('Error updating employee role:', err);
    }
  }

  //bonus functions!

  export async function updateEmployeeManager() {
    try {
      const { employeeId, newManagerId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee whose manager you want to update:',
        },
        {
          type: 'input',
          name: 'newManagerId',
          message: 'Enter the new manager ID for the employee:',
        }
      ]);
      await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [newManagerId, employeeId]);
      console.log(`Updated employee's manager`);
    } catch (err) {
      console.error('Error updating employee manager:', err);
    }
  }

  export async function viewEmployeesByManager() {
    try {
      const { managerId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the manager ID to view their employees:',
        }
      ]);
      const res = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        WHERE employee.manager_id = $1
      `, [managerId]);
      console.table(res.rows);
    } catch (err) {
      console.error('Error viewing employees by manager:', err);
    }
  }
  
  export async function viewEmployeesByDepartment() {
    try {
      const { departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID to view its employees:',
        }
      ]);
      const res = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        WHERE role.department_id = $1
      `, [departmentId]);
      console.table(res.rows);
    } catch (err) {
      console.error('Error viewing employees by department:', err);
    }
  }

  export async function deleteDepartment() {
    try {
      const { departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID to delete:',
        }
      ]);
      await pool.query('DELETE FROM department WHERE id = $1', [departmentId]);
      console.log(`Deleted department with ID: ${departmentId}`);
    } catch (err) {
      console.error('Error deleting department:', err);
    }
  }

  export async function deleteRole() {
    try {
      const { roleId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID to delete:',
        }
      ]);
      await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
      console.log(`Deleted role with ID: ${roleId}`);
    } catch (err) {
      console.error('Error deleting role:', err);
    }
  }

  export async function deleteEmployee() {
    try {
      const { employeeId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the employee ID to delete:',
        }
      ]);
      await pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);
      console.log(`Deleted employee with ID: ${employeeId}`);
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  }

  export async function viewDepartmentBudget() {
    try {
      const { departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID to view its budget:',
        }
      ]);
      const res = await pool.query(`
        SELECT SUM(role.salary) AS total_budget
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        WHERE role.department_id = $1
      `, [departmentId]);
      console.log(`Total budget for department ID ${departmentId}: $${res.rows[0].total_budget}`);
    } catch (err) {
      console.error('Error viewing department budget:', err);
    }
  }