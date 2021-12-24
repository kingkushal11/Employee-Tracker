INSERT INTO department (name)
VALUES ("HR"),
       ("SALES" ),
       ("ENGINERRING"),
       ("FINANCE" );
INSERT INTO role (title, salary, department_id)
VALUES ("HR REP", 20000, 1),
       ("Sales MAn", 50000, 2),
       ("Software Engineer", 60000, 3),
       ("Finances", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1 , NULL),
       ("Mike", "CHAN", 2, NULL),
       ("Tom", "Halland", 3, NULL),
       ("Sarah", "Lourd", 4, NULL);
       
       