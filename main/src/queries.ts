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
  
  // Add a role
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
  
  // Add an employee
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
  
  // Update an employee role
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