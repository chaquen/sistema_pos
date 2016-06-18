--Procedimientos y funciones de las tablas salidas, salida venta y devolucion   

--FUNCION PARA REGISTRAR UNA SALIDA
DELIMITER//
CREATE FUNCTION fun_registar_salida(codigo_salida VARCHAR(10), fecha_salida DATETIME, fk_id_usuario_empleado INT)
RETURNS INT
BEGIN 
    IF NOT EXISTS(SELECT CodigoSalida FROM salidas WHERE CodigoSalida=codigo_salida) THEN
	INSERT INTO salidas(CodigoSalida, FechaSalida, Fk_Id_Usuario_Empleado)
        VALUES(codigo_salida, fecha_salida, fk_id_usuario_empleado);
        
        RETURN LAST_INSERT_ID();
    ELSE
        RETURN 0;
    END IF
END
//
DELIMITER;
--Registro salida venta
DELIMITER//
CREATE FUNCTION fun_registar_salida_venta(id_salida INT, id_factura INT)
RETURNS INT
BEGIN 
            IF EXISTS(SELECT idSalida FROM salidas WHERE IdSalida=id_salida ) THEN
	INSERT INTO salida_venta(Fk_Id_Salida,Fk_Id_dFactura)
        VALUES(id_salida, id_factura);
        
    RETURN LAST_INSERT_ID();
    ELSE
         RETURN 0;
    END IF
END
//
DELIMITER;

--Registro salida  devolucion
DELIMITER//
CREATE FUNCTION fun_registar_salida_devolucion(fk_id_salida INT, fk_id_detalle_proveedor_producto INT, cantidad_devuelta INT , comentario_devolucion VARCHAR(256)
RETURNS INT
BEGIN 
        IF EXISTS (SELECT IdSalida FROM salidas WHERE IdSalida=fk_id_salida) THEN
            INSERT INTO salida_devolucion(Fk_Id_Salida, Fk_Id_Detalle_Proveedor_Producto, CantidadDevuelta, ComentarioDevolucion)
                    VALUES(fk_id_salida, fk_id_detalle_proveedor_producto, cantida_devuelta, comentario_devolucion);

                RETURN LAST_INSERT_ID();
            ELSE 
                    RETURN 0;
            END IF
END
//
DELIMITER;

DELIMITER//
CREATE PROCEDURE pa_consultar_salida_venta()
BEGIN
    SELECT * FROM vw_salida_ventas
END
//
DELIMITER;

DELIMITER//
CREATE PROCEDURE pa_consultar_salida_devolucion()
BEGIN
    SELECT * FROM vw_salidas_devolucion
END
//
DELIMITER;

DELIMITER//
CREATE PROCEDURE pa_consultar_salida()
BEGIN
    SELECT * FROM salidas
END
//
DELIMITER;