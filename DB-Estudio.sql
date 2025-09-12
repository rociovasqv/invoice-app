DROP DATABASE IF EXISTS Ampuero;
CREATE DATABASE Ampuero;
USE Ampuero;

-- Tabla de Roles
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL UNIQUE,
    disponibleR bool default 1
);

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id_rol),
    disponibleU bool default 1
);

CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    razon_social_cliente VARCHAR(255) NOT NULL,
    cuit_cliente VARCHAR(20) NOT NULL UNIQUE,
    condicion_iva ENUM('Responsable Inscripto', 'Monotributista', 'Exento', 'Consumidor Final') NOT NULL,
    domicilio_fiscal VARCHAR(255),
    disponibleC bool default 1
);

CREATE TABLE subclientes (
    id_subcliente INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    razon_social_subcliente VARCHAR(255) NOT NULL,
    cuit_subcliente VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    disponibleS bool default 1
);

CREATE TABLE proveedores (
    id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    razon_social_proveedor VARCHAR(255) NOT NULL,
    cuit_proveedor VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    disponibleP bool default 1
);
CREATE TABLE subproveedores (
    id_subproveedor INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    razon_social_subproveedor VARCHAR(255) NOT NULL,
    cuit_subproveedor VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    disponibleSP bool default 1
);

CREATE TABLE facturas ( 
    id_factura INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NULL,
    id_subcliente INT NULL,
    id_proveedor INT NULL,
    id_subproveedor INT NULL,
    tipo ENUM('A', 'B', 'C', 'Nota de Débito A', 'Nota de Débito B', 'Nota de Débito C', 
              'Nota de Crédito A', 'Nota de Crédito B', 'Nota de Crédito C') NOT NULL,
    nro_factura VARCHAR(50) NOT NULL,
    fecha_factura DATE NOT NULL,
    importe_neto DECIMAL(10, 2) NOT NULL,
    importe_iva DECIMAL(10, 2) NULL,
    importe_total DECIMAL(10, 2) NOT NULL,
    tipo_factura ENUM('Venta', 'Compra') NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_subcliente) REFERENCES subclientes(id_subcliente),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
    FOREIGN KEY (id_subproveedor) REFERENCES subproveedores(id_subproveedor),
    disponibleF bool default 1
);

INSERT INTO roles(nombre_rol)
values('contador'),
('empleado');

-- INSERT INTO Usuarios (nombre,password,rol_id) 
-- values ('contador@email.com','1234',1),
-- ('empleado@email.com','1234',2);


-- Insertar un cliente Monotributista
INSERT INTO clientes (razon_social_cliente, cuit_cliente, condicion_iva, domicilio_fiscal) 
VALUES ('Almacén La Esquina', '20-12345678-9', 'Monotributista', 'Calle Falsa 123, Ciudad A');

-- Insertar dos clientes Responsables Inscriptos
INSERT INTO clientes (razon_social_cliente, cuit_cliente, condicion_iva, domicilio_fiscal) 

VALUES ('Ferretería López', '30-87654321-0', 'Responsable Inscripto', 'Av. Principal 456, Ciudad B');

INSERT INTO clientes (razon_social_cliente, cuit_cliente, condicion_iva, domicilio_fiscal) 
VALUES ('Tienda El Sol', '30-11223344-5', 'Responsable Inscripto', 'Ruta Nacional 12, Ciudad C');

-- Agregar subclientes y proveedores para el cliente 'Ferretería López'
INSERT INTO subclientes (id_cliente, razon_social_subcliente, cuit_subcliente)
VALUES 
    (2, 'Subcliente López 1', '20-66778899-0'),
    (2, 'Subcliente López 2', '20-77889900-1');

-- Agregar subclientes y proveedores para el cliente 'Almacén La Esquina'
INSERT INTO subclientes (id_cliente, razon_social_subcliente, cuit_subcliente)
VALUES 
    (1, 'Subcliente La Esquina 1', '20-22334455-6'),
    (1, 'Subcliente La Esquina 2', '20-33445566-7');

-- Agregar subclientes y proveedores para el cliente 'Tienda El Sol'
INSERT INTO subclientes (id_cliente, razon_social_subcliente, cuit_subcliente)
VALUES 
    (3, 'Subcliente El Sol 1', '20-00112233-4'),
    (3, 'Subcliente El Sol 2', '20-11223344-5');

INSERT INTO subproveedores (id_cliente, razon_social_subproveedor, cuit_subproveedor)
VALUES 
    (3, 'Subproveedor El Sol 1', '20-00452233-4'),
    (3, 'Subproveedor El Sol 2', '20-11229544-5');

INSERT INTO subproveedores (id_cliente, razon_social_subproveedor, cuit_subproveedor)
VALUES 
    (2, 'SubProveedor López 1', '30-11223366-5'),
    (2, 'SubProveedor López 2', '30-22254455-6');

INSERT INTO subproveedores (id_cliente, razon_social_subproveedor, cuit_subproveedor)
VALUES 
    (1, 'Subproveedor La esquina 1', '20-35485566-7'),
    (1, 'Subproveedor La esquina 2', '20-44556677-8');

INSERT INTO proveedores (id_cliente, razon_social_proveedor, cuit_proveedor)
VALUES 
    (1, 'Proveedor La Esquina 1', '30-44556677-8'),
    (1, 'Proveedor La Esquina 2', '30-55667788-9');

INSERT INTO proveedores (id_cliente, razon_social_proveedor, cuit_proveedor)
VALUES 
    (3, 'Proveedor El Sol 1', '30-22334455-6'),
    (3, 'Proveedor El Sol 2', '30-33445566-7');

INSERT INTO proveedores (id_cliente, razon_social_proveedor, cuit_proveedor)
VALUES 
    (2, 'Proveedor López 1', '30-88990011-2'),
    (2, 'Proveedor López 2', '30-99001122-3');

-- Facturas para el cliente 'Almacén La Esquina'
-- Facturas de venta (tipo C) - Solo se llena importe_total
INSERT INTO facturas (id_cliente, id_subcliente, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES 
    (1, 1, 'C', '0003-00000001', '2024-11-01', 1000.00, 0, 1000.00, 'Venta'),
    (1, 2, 'C', '0003-00000002', '2024-11-02', 1500.00, 0, 1500.00, 'Venta');

-- Facturas de compra (tipo B) - Solo se llena importe_total
INSERT INTO facturas (id_cliente, id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES 
    (1, 1, 'B', '0004-00000001', '2024-11-03', 800.00, 168.00, 968.00, 'Compra'),
    (1, 2, 'B', '0004-00000002', '2024-11-04', 1200.00, 252.00, 1452.00, 'Compra');
    
    -- Facturas para el cliente 'Ferretería López'
-- Facturas de venta (tipo A)
INSERT INTO facturas (id_subcliente, id_subproveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES 
    (2, 3, 'A', '0001-00000003', '2024-11-05', 2000.00, 420.00, 2420.00, 'Venta'),
    (2, 4, 'A', '0001-00000004', '2024-11-06', 2500.00, 525.00, 3025.00, 'Venta');

-- Facturas de compra (tipo A)
INSERT INTO facturas (id_cliente, id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES 
    (2, 3, 'A', '0002-00000003', '2024-11-07', 1800.00, 378.00, 2178.00, 'Compra'),
    (2, 4, 'A', '0002-00000004', '2024-11-08', 2200.00, 462.00, 2662.00, 'Compra');

-- Facturas para el cliente 'Tienda El Sol'
-- Facturas de venta (tipo A)
INSERT INTO facturas (id_subcliente, id_subproveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES 
    (3, 5, 'A', '0001-00000005', '2024-11-09', 3000.00, 630.00, 3630.00, 'Venta'),
    (3, 6, 'A', '0001-00000006', '2024-11-10', 3500.00, 735.00, 4235.00, 'Venta');

-- Facturas de compra (tipo A)
INSERT INTO facturas (id_cliente, id_proveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES 
    (3, 5, 'A', '0002-00000005', '2024-11-11', 2800.00, 588.00, 3388.00, 'Compra'),
    (3, 6, 'A', '0002-00000006', '2024-11-12', 3200.00, 672.00, 3872.00, 'Compra');

INSERT INTO facturas (id_subcliente, id_subproveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES
  (3, 1, 'B', '0005-00000001', '2024-11-13', 500.00, 105.00, 605.00, 'Compra'),
  (3, 2, 'B', '0005-00000002', '2024-11-14', 750.00, 157.50, 907.50, 'Compra');

INSERT INTO facturas (id_subcliente, id_subproveedor, tipo, nro_factura, fecha_factura, importe_neto, importe_iva, importe_total, tipo_factura)
VALUES
  (2, 3, 'A', '0006-00000003', '2024-11-15', 900.00, 189.00, 1089.00, 'Venta'),
  (2, 4, 'A', '0006-00000004', '2024-11-16', 1100.00, 231.00, 1331.00, 'Venta');
    
    SELECT * FROM clientes;
    
    SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total
FROM facturas f
WHERE f.id_cliente = 2 AND f.tipo_factura = 'Venta';

SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total, s.razon_social AS subcliente
FROM facturas f
JOIN subclientes s ON f.id_subcliente = s.id_subcliente
WHERE f.id_cliente = 2 AND f.tipo_factura = 'Venta';

SELECT f.id_factura, f.nro_factura, f.fecha_factura, f.importe_neto, f.importe_iva, f.importe_total, 
       s.razon_social AS subcliente, s.cuit AS cuit_subcliente
FROM facturas f
JOIN subclientes s ON f.id_subcliente = s.id_subcliente
WHERE f.id_cliente = 2 AND f.tipo_factura = 'Venta';

