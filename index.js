const mysql = require('mysql2');
const dotenv = require ('dotenv');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
dotenv.config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the movies_db database.`)
  );
  db.connect(err => {
      if (err) throw err
      console.log('connect')
  })
  function promptuser(){
      inquirer.prompt([{
          type: 'list',
          name: 'choice',
          message: 'What do you want to do?',
          choices:['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
      }
      ]).then(function (result){
          console.log (result)
      })

  }
  function getalldepartment(){
    const sql = `Select id, name AS title FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
          throw err
      }
      console.table(rows)
    });
  }
  