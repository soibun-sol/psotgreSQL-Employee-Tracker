
  # postgreSQL-Employee-Tracker

  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  ## Description
  A management system that opperates as a command line application that is used to manage and acces a company's employee dattabase. this application uses node.js, the inquirer package, the pg package, and postgreSQL

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributors](#contributors)
  - [Tests](#tests)
  - [License](#license)
  - [Questions](#questions)

  ## Installation
  to install first go to my github repo containing this application. Copy the hhtp or shs code/URL and in your terminal naigate to an apporiate distribution folder for the repository clone. to clone, in the treminal, type "git clone (copied code/URL)". to completely install and run this application you will want to make sure that you have PostgreSQL and pgAdmin4 downloaded. postgreSQL and pgAdmin4 allow you to store all databse info properly. after setting all of this up return to your terminal and run the command "npm i" and then "npm run build." before running your node.js you will need to create a .env file in the main folder. contained bellow will be a copy of boiler plate content you should paste into this file.

  - DB_NAME=employee_db
  - DB_USER=[your postgresql username]
  - DB_PASSWORD=[your password]

  After the .env file has been created you will need to initialize the database. go to your "db" folder and intialize postgres by typing "psql -U (your username here!)" into your terminal. after you are finished with this you will want to implent the schema.sql and seeds.sql files. to do so, return to your terminal and type "\i schema.sql" for the schema.sql file and "\i seeds.sql" for the seeds.sql file.this will create and install the database to pgadmin

  ## Usage
  the usage of this application is to allow someone to navigate through a company's database of employees, departments, and the employees role. it allows for the addition and deletion for each item listed above and provides tables of information for each department, employee, and the employee's role.

  ## Contributors
  Keegan Hinton

  ## Tests
  n/a

  ## License
   ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
     This project contains a [MIT](https://opensource.org/licenses/MIT) license.

  ## Questions
  Github: [soibun-sol](https://github.com/soibun-sol)
  Email: Khinton386@gmail.com
  Github Repo Link:https://github.com/soibun-sol/psotgreSQL-Employee-Tracker
  Screencastify Link:
