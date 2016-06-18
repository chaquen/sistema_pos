-- Scripts de los procedimientos almacenados y funciones
--REGISTRAR PROVEEDOR
DELIMITER //
CREATE FUNCTION fun_registrar_proveedor(nombre VARCHAR(55),nombreContacto VARCHAR(55),telefonoContacto VARCHAR(25),correoContacto VARCHAR(25),nit VARCHAR(25))
RETURNS INT 
BEGIN
    IF NOT EXISTS(SELECT * FROM proveedor WHERE NombreProveedor=nombre ) THEN
        INSERT INTO proveedor(NombreProveedor, NombreContactoProveedor, TelefonoContactoProveedor, CorreoContactoProveedor,Nit)
        VALUES(nombre,nombreContacto,telefonoContacto,correoContacto,nit);
    RETURN LAST_INSERT_ID();
    ELSE
    RETURN 0;
    END IF;
END
//
DELIMITER;
--EDITAR PROVEEDOR
DELIMITER //
CREATE FUNCTION fun_actualizar_proveedor(idProveedor INT,nombre VARCHAR(55),nombreContacto VARCHAR(55),telefonoContacto VARCHAR(25),correoContacto VARCHAR(25))
RETURNS INT 
BEGIN
    IF EXISTS(SELECT * FROM proveedor WHERE IdProveedor=idProveedor) THEN
        UPDATE proveedor 
            SET
             NombreProveedor=nombre,
             NombreContactoProveedor=nombreContacto, 
             TelefonoContactoProveedor=telefonoContacto,
             CorreoContactoProveedor=correoContacto
            WHERE IdProveedor=idProveedor;
            RETURN 1;
    ELSE
            RETURN 0;
    END IF;
END
//
DELIMITER;
--EDITAR ESTADO PROVEEDOR
DELIMITER //
CREATE FUNCTION fun_actualizar_estado_proveedor(idProveedor INT)
RETURNS INT 
BEGIN
    IF EXISTS(SELECT * FROM proveedor WHERE IdProveedor=idProveedor) THEN

        IF((SELECT EstadoProveedor FROM proveedor WHERE IdProveedor=idProveedor)=1) THEN
				UPDATE proveedor SET EstadoProveedor=0 
            WHERE IdProveedor=idProveedor;
        ELSE 
            UPDATE proveedor SET EstadoProveedor=1
            WHERE IdProveedor=idProveedor;
        RETURN 1;
        END IF;
ELSE
   RETURN 0;
END IF;
    
END
//
DELIMITER;

--CONSULTAR TODOS LOS PROVEEDORES
DELIMITER //
CREATE PROCEDURE pa_consultar_todos_los_proveedores()
BEGIN
    SELECT * FROM proveedor
END
//
DELIMITER;
