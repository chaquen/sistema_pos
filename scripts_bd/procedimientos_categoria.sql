-- Scripts de los procedimientos almacenados
--REGISTRO CATEGORIA
DELIMITER //
CREATE FUNCTION  fun_registrar_categoria_producto (nombreCategoria VARCHAR(55),descripcion VARCHAR(125)) 
RETURNS INT
BEGIN
IF NOT EXISTS(SELECT * FROM categoria_producto WHERE NombreCategoriaProducto=nombreCategoria) THEN 
 	INSERT INTO categoria_producto (NombreCategoriaProducto,DescripcionCategoriaProducto) 
 	VALUES (nombreCategoria,descripcion);
RETURN LAST_INSERT_ID();    
ELSE
RETURN 0;
END IF; 
END
//
DELIMITER;

--ACTUALIZAR CATEGORIA
DELIMITER //
CREATE FUNCTION  fun_actualizar_categoria_producto (idCategoria INT, nombreCategoria VARCHAR(55),descripcion VARCHAR(125))
RETURNS INT

BEGIN

IF EXISTS(SELECT * FROM categoria_producto WHERE IdCategoriaProducto=idCategoria) THEN 
 	UPDATE categoria_producto 
                    SET  NombreCategoriaProducto = nombreCategoria,
                    DescripcionCategoriaProducto= descripcion 
                    WHERE IdCategoriaProducto=idCategoria; 	
   RETURN 1;
ELSE
   RETURN 0;
END IF; 
END
//
DELIMITER;

--ELIMINAR CATEGORIA
DELIMITER //
CREATE FUNCTION  fun_actualizar_estado_categoria_producto (idCategoria INT)
RETURNS INT
BEGIN

IF EXISTS(SELECT * FROM categoria_producto WHERE IdCategoriaProducto=idCategoria) THEN 
	IF ((SELECT EstadoCategoriaProducto FROM categoria_producto WHERE IdCategoriaProducto=idCategoria)=1) THEN 	
 	 UPDATE categoria_producto 
                    SET  EstadoCategoriaProducto = '0'
                    WHERE IdCategoriaProducto=idCategoria; 
        ELSE
     	UPDATE categoria_producto 
                    SET  EstadoCategoriaProducto = '1'
                    WHERE IdCategoriaProducto=idCategoria; 
     END IF;
   RETURN 1;
ELSE
    RETURN 0;
END IF; 
END
//
DELIMITER;

--CONSULTAR CATEGORIA
DELIMITER //
CREATE PROCEDURE  pa_consultar_todas_las_categoria_producto ()

BEGIN
    SELECT * FROM categoria_producto ;

END
//
DELIMITER;

