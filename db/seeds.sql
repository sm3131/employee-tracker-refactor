INSERT INTO departments (name)
VALUES
('Management'),
('Research and Development'),
('IT Services'),
('Web Development'),
('Administration'),
('Sales and Marketing'),
('Product Development');

INSERT INTO roles (title, salary, departments_id)
VALUES
('CEO', 5000000, 1),
('Manager', 1000000, 1),
('Front-End Developer', 180000, 4),
('Back-End Developer', 250000, 4),
('Head of R&D', 300000, 2),
('Chief Marketing Officer', 430000, 6),
('Quality Assurance Engineer', 175000, 7),
('Sales Representative', 150000, 6);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
('Walter', 'White', 4, 2),
('Gus', 'Fring', 1, null),
('Hank', 'Schrader', 7, 6),
('Huell', 'Babineaux', 8, 7),
('Skyler', 'White', 5, 1),
('Mike', 'Ehrmantraut', 2, 2),
('Saul', 'Goodman', 6, 2);