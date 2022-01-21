INSERT INTO departments (name)
VALUES
('Management'),
('Research and Development'),
('IT Services'),
('Web Development'),
('Administration'),
('Sales and Marketing'),
('Product Development');

INSERT INTO role (title, salary, departments_id)
VALUES
('CEO', 5000000, 1),
('Manager', 1000000, 1),
('Front-End Developer', 180000, 4),
('Back-End Developer', 250000, 4),
('Head of R&D', 300000, 2),
('Chief Marketing Officer', 430000, 6),
('Quality Assurance Engineer', 175000, 7),
('Sales Representative', 150000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Walter', 'White', 4, 1),
('Jesse', 'Pinkman', 3, 4),
('Gus', 'Fring', 1, null),
('Hank', 'Schrader', 7, null),
('Huell', 'Babineaux', 8, 6),
('Skyler', 'White', 5, 4),
('Mike', 'Ehrmantraut', 2, 1),
('Saul', 'Goodman', 6, null);