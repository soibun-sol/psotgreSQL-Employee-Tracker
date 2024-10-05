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
