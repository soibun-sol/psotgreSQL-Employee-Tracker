import inquirer from "inquirer";
import client from "./db";
import { 
    viewAllDepartments, 
    viewAllRoles, 
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    viewDepartmentBudget
} from "./queries";

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View employees by manager',
                'View employees by department',
                'View department budget',
                'Quit'
            ]
        }
    ]);

    switch (action) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'View all employees':
            await viewAllEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Update an employee manager':
            await updateEmployeeManager();
            break;
        case 'Delete a department':
            await deleteDepartment();
            break;
        case 'Delete a role':
            await deleteRole();
            break;
        case 'Delete an employee':
            await deleteEmployee();
            break;
        case 'View employees by manager':
            await viewEmployeesByManager();
            break;
        case 'View employees by department':
            await viewEmployeesByDepartment();
            break;
        case 'View department budget':
            await viewDepartmentBudget();
            break;                            
        case 'Quit':
            client.end();
            process.exit();
    }
    mainMenu();
};

client.connect ()
    .then(() => {
        console.log('connected to the database');
        mainMenu();
    })
    .catch((error: any) => {
        console.error('Failed to connect to the database:', error);
      });