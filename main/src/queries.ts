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
