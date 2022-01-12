const mysql = require('mysql2');
const dotenv = require ('dotenv');
const inquirer = require('inquirer');
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
      promptuser()
  })
  function promptuser(){
      inquirer.prompt([{
          type: 'list',
          name: 'choice',
          message: 'What do you want to do?',
          choices:['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
      }
      ]).then(function (result){
          console.log (result.choice)
          if (result.choice === 'view all departments'){
            getalldepartment();
          }
          if (result.choice === 'view all roles'){
            getallrole();
          }
          if (result.choice === 'view all employees'){
            getallempoyees();
          }
          if (result.choice === 'add a department'){
            addadepartment();
          }
          if (result.choice === 'add a role'){
            addarole();
          }
          if (result.choice === 'add an employee'){
            addaempoyees();
          }
          if (result.choice === 'update an employee role'){
            updateempolyee();
          }    
          if (result.choice === 'quit'){
            quit()

          }
        
      })

  }
  function getalldepartment(){
    const sql = `Select id, name AS title FROM department`;
    
    db.query(sql, (err, rows) => {
      if (err) {
          throw err
      }
      console.table(rows)
      promptuser()
    });
  }
  function getallrole(){
    const sql = `Select id, title, salary, department_id FROM role`;
    
    db.query(sql, (err, rows) => {
      if (err) {
          throw err
      }
      console.table(rows)
      promptuser()
    });
  }
  function getallempoyees(){
    const sql = `Select id, first_name, last_name, role_id, manager_id FROM employee`;
    
    db.query(sql, (err, rows) => {
      if (err) {
          throw err
      }
      console.table(rows)
      promptuser()
    });
  }
  function addadepartment(){
    inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
  }]).then(function(result){
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [result.name]
    
    db.query(sql, params, (err, rows) => {
      if (err) {
          throw err
      }
      console.log('added the department')
      promptuser()
    });
  })
  }
  function addarole(){
    inquirer.prompt([{
      type: 'input',
      name: 'title',
      message: 'what is the title of the role?',
  },{
    type: 'input',
    name: 'salary',
    message: 'what is the salary of the role?',
  },{
    type: 'input',
    name: 'department_id',
    message: 'what is the department id of the role?',
  }]).then(function(result){
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [result.title, result.salary, result.department_id]
    
    db.query(sql, params, (err, rows) => {
      if (err) {
          throw err
      }
      console.log('added the role')
      promptuser()
    });
  })
  }
  function addaempoyees(){
    inquirer.prompt([{
      type: 'input',
      name: 'first_name',
      message: 'what is the first name of the employee?',
  },{
    type: 'input',
    name: 'last_name',
    message: 'what is the last name of the employee?',
  },{
    type: 'input',
    name: 'role_id',
    message: 'what is the role id of the role?',
  },{
    type: 'input',
    name: 'manager_id',
    message: 'what is the manager id of the role?',
  }]).then(function(result){
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [result.first_name, result.last_name, result.role_id, result.manager_id]
    
    db.query(sql, params, (err, rows) => {
      if (err) {
          throw err
      }
      console.log('added the empolyee')
      promptuser()
    });
  })
  }
  function updateempolyee(){
    inquirer.prompt([{
    type: 'input',
    name: 'employee_id',
    message: 'what is the empolyee id of the role?',
  },{
    type: 'input',
    name: 'role_id',
    message: 'what is the role id of the role?',
  }]).then(function(result){
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [result.role_id, result.employee_id]
    
    db.query(sql, params, (err, rows) => {
      if (err) {
          throw err
      }
      console.log('Updated the empolyee')
      promptuser()
    });
  })
  }
   function quit(){
     process.exit()
   }
  
