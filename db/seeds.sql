-- Insert initial data into the 'department' table
INSERT INTO department (name) VALUES
('Engineering'),
('Human Resources'),
('Marketing'),
('Finance');

-- Insert initial data into the 'role' table
-- Note: Adjust the department_id values based on the departments inserted above
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Systems Analyst', 70000, 1),
('HR Manager', 65000, 2),
('HR Assistant', 45000, 2),
('Marketing Director', 85000, 3),
('Accountant', 75000, 4);

-- Insert initial data into the 'employee' table
-- Note: Adjust the role_id and manager_id values based on the roles and employees inserted above
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), -- Assuming 'Software Engineer' has no manager
('Jane', 'Smith', 2, 1), -- Assuming 'Systems Analyst' reports to 'Software Engineer'
('Emily', 'Jones', 3, NULL), -- Assuming 'HR Manager' has no manager
('Michael', 'Brown', 4, 3), -- Assuming 'HR Assistant' reports to 'HR Manager'
('Linda', 'Johnson', 5, NULL), -- Assuming 'Marketing Director' has no manager
('James', 'Wilson', 6, NULL); -- Assuming 'Accountant' has no manager

