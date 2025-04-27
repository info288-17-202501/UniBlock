-- Crear una base de datos
CREATE DATABASE ejemploDB;

-- Usar esa base de datos
USE ejemploDB;

-- Crear una tabla
CREATE TABLE Personas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    edad INT
);

-- Insertar datos en la tabla
INSERT INTO Personas (nombre, edad) VALUES ('Ana', 25);
INSERT INTO Personas (nombre, edad) VALUES ('Luis', 30);

-- Consultar datos
SELECT * FROM Personas;

-- Actualizar un dato
UPDATE Personas SET edad = 26 WHERE nombre = 'Ana';

-- Eliminar un dato
DELETE FROM Personas WHERE nombre = 'Luis';
