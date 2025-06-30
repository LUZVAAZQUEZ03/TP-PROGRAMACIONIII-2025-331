CREATE DATABASE IF NOT EXISTS beauscent_db;
USE beauscent_db;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    precio DECIMAL(10,2),
    stock INT,
    fotoProducto VARCHAR(255),
    categoria ENUM('Perfume', 'Skincare'),
    estado BOOLEAN DEFAULT 1
);

INSERT INTO productos (nombre, precio, stock, fotoProducto, categoria, estado) VALUES
    ('Eau de Lumière 50 ml', 79.90, 30, '/productos/1.png', 'Perfume', 1),
    ('Noir Absolu 100 ml', 119.00, 20, '/productos/2.png', 'Perfume', 1),
    ('Brisa Floral 30 ml', 39.50, 60, '/productos/3.png', 'Perfume', 1),
    ('Serum Revitalizante 30 ml', 45.25, 40, '/productos/5.png', 'Skincare', 1),
    ('Crema HydraGlow 50 ml', 34.99, 55, '/productos/6.png', 'Skincare', 1);

CREATE TABLE usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR (100),
    correo VARCHAR (100),
    passw VARCHAR (400)

);

INSERT INTO usuario (usuario, correo, passw) VALUES
    ('David',	'david@example.com', '$2b$10$D7ml0Vv/H.VNnjgK3ROj4uelGYV9If85047SJPJeJnD3uQ8MaSj5u'),
    ('Alice',	'alice@example.com', '$2b$10$AD2FIHLMZH50IFWIltl6EuWKutVDj4LuX1V.5p24eVRRo9wDwX2oy'),
    ('admin1', 'admin1@example.com', '');


CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(255),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2)
);
CREATE TABLE detalles_venta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT,
    producto_id INT,
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

TRUNCATE TABLE productos;


SELECT * FROM usuario;

SELECT * FROM productos;
update productos set estado = 0 where id = 5;
SELECT * FROM productos;


drop table productos;
drop table ventas;
delete from productos where estado = 0;
SELECT * FROM ventas;

show databases;

show tables;
select * from productos;
