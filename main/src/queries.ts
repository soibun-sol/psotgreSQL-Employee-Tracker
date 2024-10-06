import inquire from 'inquirer';
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
    const { name } = await inquire.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department'
        }
    ]);
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log('department added: ${name}');
    } catch (err) {
        console.error('cannot add department', err);
    }
}

export async function addRole() {
    const { title, salary, department_id } = await inquire.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department id of the role'
        }
    ]);
    try {
        await pool.query('INSERT INTO role (title,salary,department_id) VALUES ($1,$2,$3)', [title, salary, department_id]);
        console.log('role added: ${title}');
    } catch (err) {
        console.error('cannot add role', err);
    }
}

export async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquire.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role id of the employee'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager id of the employee'
        }
    ]);
    try {
        await pool.query('INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ($1,$2,$3,$4)', [first_name, last_name, role_id, manager_id]);
        console.log('employee added: ${first_name} ${last_name}');
    } catch (err) {
        console.error('cannot add employee', err);
    }
}

export async function updateEmployeeRole() {
    const { employee_id, role_id } = await inquire.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the id of the employee'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the id of the new role'
        }
    ]);
    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
        console.log('employee role updated');
    } catch (err) {
        console.error('cannot update employee role', err);
    }
}
