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
    ('John', 'Smith', 2, 1),
    ('Kelly', 'Jones', 2, 1),
    ('Brian', 'Johnson', 1, 1),
    ('Jeff', 'Crops', 1, 1),
    ('Mike', 'Coleman', 4, 1),
    ('Scott', 'Benson', 4, 1),
    ('Ted', 'Bender', 7, Null),
    ('Kristen', 'Collins', 5, 8),
    ('Lynn', 'Sanders', 5, 8),
    ('Jessica', 'Krause', 6, 8),
    ('Mike', 'Smithers', 6, 8),
    ('Jim', 'Carson', 6, 8),
    ('Joann', 'Makara', 10, Null),
    ('Jesse', 'Marks', 9, 14),
    ('Sean', 'Gardner', 9, 14),
    ('Kim', 'Joyner', 8, 14),
    ('Christine', 'Bonner', 8, 14),
    ('Lance', 'Morgan', 12, Null),
    ('Nicole', 'Minks', 11, 19),
    ('John', 'Tinkler', 11, 19),
    ('Paula', 'Franks', 11, 19);

