--FUNCIONES Y PROCEDIMIENTOS PARA A TABA ENTRADA Y ENTRDA DEVOLUCION Y PEDIDO
--REGISTRAR ENTRADA
DELIMITER//
CREATE FUNCTION fun_registrar_entrada(codigo_entrada VARCHAR(10),fecha_entrada DATETIME, fk_id_usuario_empleado INT)
RETURNS INT
BEGIN
    IF NOT EXISTS(SELECT * FROM entradas WHERE CodigoEntrada=codigo_entrada) THEN
        INSERT INTO entradas (CodigoEntrada, FechaEntrada, Fk_Id_Usuario_Empleado)
                    VALUES(codigo_entrada,fecha_entrada, fk_id_usuario_empleado);
        RETURN LAST_INSERT_ID();
    ELSE
        RETURN 0;
    END IF;
END
DELIMITER;
--FUNCTION PARA registar una entrada pedido
    DELIMITER//
    CREATE FUNCTION fun_registrar_entrada_pedido(fk_id_entrada INT, fk_id_detalle_producto_proveedor INT, cantidad_entrada INT, precio_proveedorEntrada DECIMAL)
    RETURNS INT
    BEGIN
        IF NOT EXISTS(SELECT * FROM entradas WHERE IdEntrada=fk_id_entrada) THEN
            INSERT INTO entrada_pedido (Fk_Id_Entrada, Fk_Id_Detalle_Producto_Proveedor, CantidadEntrada, PrecioProveedorEntrada)
            VALUES(fk_id_entrada, fk_id_detalle_producto_proveedor, cantidad_entrada, precio_proveedorEntrada);
            RETURN LAST_INSERT_ID();    
        ELSE
            RETURN 0;
        END IF;
    END //
    DELIMITER;
--FUNCION PARA REGISTRA UNA ENTRADA DEVOLUCION
DELIMITER//
CREATE FUNCTION fun_registrar_entrada_devolucion(id_entrada INT,
                                                 fk_id_detalle_factura INT, 
                                                 cantidad_devolucion INT, 
                                                 estado_devolucion VARCHAR(11), 
                                                 cometario_devolucion VARCHAR(256))
RETURNS INT
BEGIN
    IF NOT EXISTS(SELECT * FROM entradas WHERE IdEntrada=id_entrada) THEN
        INSERT INTO entrada_devolucion (Fk_Id_Detalle_Factura, CantidadDevolucion, EstadoDevolucion, CometarioDevolucion,Fk_id_Entrada)
            VALUES(fk_id_detalle_factura, cantidad_devolucion, estado_devolucion, cometario_devolucion,id_entrada);
        RETURN LAST_INSERT_ID();    
     ELSE 
        RETURN 0;
     END IF;   
END
DELIMITER;

DELIMITER //
CREATE PROCEDURE pa_consultar_entrada()
BEGIN
    SELECT * FROM entrada
END

DELIMITER;
DELIMITER//
CREATE PROCEDURE pa_consultar_entrada_pedido()
BEGIN
    SELECT * FROM vw_vista_entrada_pedido
END
//
DELIMITER;
DELIMITER//
CREATE PROCEDURE pa_consultar_entrada_devolucion()
BEGIN
    SELECT * FROM vw_vista_entrada_devolucion
END
//
DELIMITER;
