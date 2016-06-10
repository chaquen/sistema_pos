--Procedimientos y funciones para la tabla factura y detalle factura
--FUNCION PARA EL REGISTRO DE UNA FACTURA
DELIMITER//
CREATE FUNCTION fun_registrar_factura(codigo_factura VARCHAR(10),fecha_factura DATETIME,estado_factura ENUM,id_empleado INT,id_cliente INT)
RETURNS INT 
BEGIN
    IF NOT EXISTS(SELECT * FROM factura WHERE CodigoFactura=codigo_factura) THEN
        INSERT INTO factura(CodigoFactura, FechaFacturacion, EstadoFactura, Fk_Id_Usuario_Creador, Fk_Id_Cliente)
        VALUES(codigo_factura,fecha_factura,estado_factura,id_empleado,id_cliente);
        RETURN LAST_INSERT_ID();
    ELSE
        RETURN 0;
    END IF;
END
//
DELIMITER;
--FUNCION PARA registrar un detalle de la factura
DELIMITER  //
FUNCTION fun_registrar_detalle_factura(fk_id_factura INT , fk_id_producto INT , cantidad INT , valor_producto DECIMAL, descuento FLOAT)
RETURNS INT
BEGIN
    INSERT INTO detalle_factura_producto(Fk_Id_Factura, Fk_Id_Producto, Cantidad, ValorProducto, Descuento)
    VALUES(fk_id_factura,fk_id_producto,cantidad,valor_producto,descuento);
    RETURN LAST_INSERT_ID();
END
//
DELIMITER;
--PROCEDIMIENTO PARA CONSULTAR LAS FACTURAS
DELIMITER//
CREATE PROCEDURE pa_consultar_factura(codigo VARCHAR(10),fecha_uno DATE,fecha_dos DATE)
BEGIN
    IF (codigo <> "" AND fecha_uno = "" AND fecha_dos = "") THEN 
        SELECT * FROM vw_facturas WHERE CodigoFactura = codigo;
    ELSE IF (codigo = "" AND fecha_uno <> "" AND fecha_dos = "") THEN
        SELECT * FROM vw_facturas WHERE FechaFacturacion = fecha_uno;
    ELSE IF(codigo = "" AND fecha_uno <> "" AND fecha_dos <> "") THEN 
        SELECT * FROM vw_facturas WHERE FechaFacturacion >= fecha_uno AND FechaFacturacion <= fecha_dos;
    ELSE 
        SELECT 'por favor ingresa valores distintos de vacio' as respuesta;
    END IF;
    
END 
//
DELIMITER;