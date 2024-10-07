
  # postgreSQL-Employee-Tracker

  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  ## Description
  A management system that opperates as a command line application that is used to manage and acces a company's employee dattabase. This application uses Node.js, the Inquirer package, the pg package, and PostgreSQL

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributors](#contributors)
  - [Tests](#tests)
  - [License](#license)
  - [Questions](#questions)

  ## Installation
  To install first go to my github repo containing this application. Copy the hhtp or shs code/URL and in your terminal naigate to an apporiate distribution folder for the repository clone. To clone, in the treminal, type "git clone (copied code/URL)". To completely install and run this application you will want to make sure that you have PostgreSQL and pgAdmin4 downloaded. PostgreSQL and pgAdmin4 allow you to store all databse info properly. After setting all of this up return to your terminal and run the command "npm i" and then "npm run build." Before running your Node.js you will need to create a .env file in the main folder. Contained bellow will be a copy of boiler plate content you should paste into this file.

  - DB_NAME=employee_db
  - DB_USER=[your postgresql username]
  - DB_PASSWORD=[your password]

  After the .env file has been created you will need to initialize the database. Go to your "db" folder and intialize postgres by typing "psql -U (your username here!)" into your terminal. After you are finished with this you will want to implent the schema.sql and seeds.sql files. To do so, return to your terminal and type "\i schema.sql" for the schema.sql file and "\i seeds.sql" for the seeds.sql file.this will create and install the database to pgadmin. After you have contacted to the database you will need to click on the main file and open it in the intergrated terminal by right clicking on the folder. You will then want to type " node /dist/index.js" and hit enter. this will run the application and allow you to create the tables indicated in the command line.

  ## Usage
  The usage of this application is to allow someone to navigate through a company's database of employees, departments, and the employees role. It allows for the addition and deletion for each item listed above and provides tables of information for each department, employee, and the employee's role.

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
  Screencastify Link:https://drive.google.com/file/d/1OQKY8MuDjJTFmVkrisVwvN3ogvwqmNUe/view
