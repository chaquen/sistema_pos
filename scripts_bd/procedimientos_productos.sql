--Scripts para las funciones y procedimientos de la tabla producto
--FUNCION PARA REGISTRAR UN PRODUCTO
DELIMITER //
CREATE FUNCTION fun_registrar_producto( codigo_producto VARCHAR(20), 
                                        nombre_producto VARCHAR(55), 
                                        descripcion_producto VARCHAR(125),
                                        fk_id_categoria INT )
 RETURNS INT
BEGIN
IF NOT EXISTS(SELECT * FROM producto WHERE CodigoProducto=codigo_producto) THEN
    INSERT INTO producto(CodigoProducto, NombreProducto, DescripcionProducto, Fk_Id_Categoria)
    VALUES (codigo_producto,nombre_producto,descripcion_producto,fk_id_categoria);
    RETURN LAST_INSERT_ID();
ELSE
RETURN 0;
END IF;

END
//
DELIMITER;
--FUNCION PARA EDITAR UN  PRODUCTO
DELIMITER //
CREATE FUNCTION fun_actualizar_producto(idProducto INT, 
                                        codigo_producto VARCHAR(20), 
                                        nombre_producto VARCHAR(55), 
                                        descripcion_producto VARCHAR(125),
                                        fk_id_categoria INT )
 RETURNS INT
BEGIN
IF EXISTS(SELECT * FROM producto WHERE IdProducto=idProducto) THEN
        UPDATE producto 
        SET CodigoProducto= codigo_producto,
            NombreProducto=nombre_producto,
            DescripcionProducto=descripcion_producto,
            Fk_Id_Categoria=fk_id_categoria;
        RETURN 1;
ELSE
RETURN 0;
END IF;

END
//
DELIMITER;
--FUNCION PARA CAMBIAR EL ESTADO DE UN PRODUCTO
DELIMITER //
CREATE FUNCTION fun_actualizar_estado_producto(idProducto INT)
RETURNS INT
BEGIN 
 IF EXISTS((SELECT * FROM producto WHERE IdProducto=idProducto)) THEN
    IF((SELECT EstadoProducto FROM producto WHERE IdProducto=idProducto)=1) THEN
        UPDATE producto SET EstadoProducto = 0
        WHERE IdProducto=idProducto;
        RETURN 1;   
    ELSE
        UPDATE producto SET EstadoProducto = 1
        WHERE IdProducto=idProducto;
        RETURN 1;
    END IF;
    
 ELSE
RETURN 0;
 END IF;
END
//
DELIMITER;
--PROCEDIMIENTO ALMACENADO PARA CONSULYTAR TODOS LOS PRODUCTOS
DELIMITER //
CREATE PROCEDURE pa_consultar_todos_los_productos ()
BEGIN
 SELECT * FROM producto ;
END
//
DELIMITER;

--Funcion para asociar un producto con un proveedor
DELIMITER //
CREATE FUNCTION fun_asociar_producto_con_proveedor(id_producto,id_proveedor)
RETURNS INT
BEGIN
    IF NOT EXISTS (SELECT * FROM detalle_producto_proveedor WHERE Fk_Id_Producto=id_producto AND Fk_Id_Proveedor=id_proveedor) THEN 
        INSERT INTO detalle_producto_proveedor(Fk_id_Producto,Fk_Id_Proveedor)
        VALUES(id_producto,id_proveedor);
        RETURN LAST_INSERT_ID();
    ELSE
     RETURN 0;   
    END IF;
END
//
DELIMITER;