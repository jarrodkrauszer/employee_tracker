DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- 
Use employee_db;
-- 
-- Create Department Table
CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
-- 
-- Create Role Table
CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) 
    REFERENCES department (id) 
    ON DELETE CASCADE
);
-- 
-- Create Employee Table
CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) 
    REFERENCES role (id) 
    ON DELETE CASCADE 
  FOREIGN KEY (manager_id) 
    REFERENCES employee (id)
    ON DELETE SET NULL
);