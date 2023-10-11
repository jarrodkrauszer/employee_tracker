USE employee_db;

INSERT INTO department (name)
VALUES ('IT'),
       ('Customer Service'),
       ('Sales'),
       ('Legal');

INSERT INTO role (
  title,
  salary,
  department_id
) VALUES
    ('Technical Support', 55000, 1),
    ('Web Developer', 95000, 1),
    ('Lead Developer', 125000, 1),
    ('Project Manager', 70000, 1),
    ('Customer Service Rep', 45000, 2),
    ('Call Center Agent', 50000, 2),
    ('Customer Support Manager', 75000, 2),
    ('Sales Rep', 65000, 3),
    ('Account Manager', 80000, 3),
    ('Sales Manager', 110000, 3),
    ('Paralegal', 75000, 4),
    ('Lawyer', 150000, 4);

INSERT INTO employee (
  first_name,
  last_name,
  role_id,
  manager_id
) VALUES 
    ('Jarrod', 'Krauszer', 3, Null),
    ('Ted', 'Bender', 7, Null),
    ('Joann', 'Makara', 10, Null),
    ('Lance', 'Morgan', 12, Null),
    ('Lynn', 'Sanders', 5, 2),
    ('John', 'Smith', 2, 1),
    ('Jeff', 'Crops', 1, 1),
    ('Mike', 'Coleman', 4, 1),
    ('Brian', 'Johnson', 1, 1),
    ('Scott', 'Benson', 4, 1),
    ('Kelly', 'Jones', 2, 1),
    ('Kristen', 'Collins', 5, 2),
    ('Kim', 'Joyner', 8, 3),
    ('Jim', 'Carson', 6, 2),
    ('Jesse', 'Marks', 9, 3),
    ('Sean', 'Gardner', 9, 3),
    ('Paula', 'Franks', 11, 4),
    ('Mike', 'Smithers', 6, 2),
    ('Christine', 'Bonner', 8, 3),
    ('Nicole', 'Minks', 11, 4),
    ('Jessica', 'Krause', 6, 2),
    ('John', 'Tinkler', 11, 4);
    
    

    

    
