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
    ('Project Manager', 70000, 1),
    ('Customer Service Rep', 45000, 2),
    ('Call Center Agent', 50000, 2),
    ('Sales Rep', 65000, 3),
    ('Account Manager', 80000, 3),
    ('Paralegal', 75000, 4),
    ('Lawyer', 150000, 4);

INSERT INTO employee (
  first_name,
  last_name,
  role_id,
  manager_id
) VALUES 
