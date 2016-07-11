-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 11, 2016 at 07:59 AM
-- Server version: 5.5.49-cll-lve
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mohansof_pos`
--
CREATE DATABASE IF NOT EXISTS `mohansof_pos` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mohansof_pos`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_categoria_producto_por_id`(IN `id` INT)
    NO SQL
SELECT * from categoria_producto WHERE IdCategoriaProducto=id$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_id_detalle_producto_proveedor`(IN `codigo_producto` VARCHAR(20), IN `id_proveedor` INT)
    NO SQL
SELECT *
FROM detalle_producto_proveedor dpp
INNER JOIN producto p ON p.IdProducto = dpp.Fk_Id_Producto
WHERE CodigoProducto LIKE  codigo_producto
AND Fk_Id_Proveedor =  id_proveedor$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_producto_por_codigo`(IN `cod` VARCHAR(55))
    NO SQL
SELECT * FROM vw_productos v WHERE v.CodigoProducto = cod$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_salida`()
    NO SQL
SELECT * FROM salidas$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_salida_devolucion`()
    MODIFIES SQL DATA
SELECT * FROM vw_salidas_devolucion$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_salida_por_codigo`(IN `codigo` INT)
    NO SQL
SELECT * FROM vw_salida_ventas WHERE CodigoFactura = codigo$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_salida_venta`()
    NO SQL
SELECT * FROM vw_salida_ventas$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_todas_las_categoria_producto`()
BEGIN
    SELECT * FROM categoria_producto ;

END$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_todos_los_producto`()
    NO SQL
SELECT * FROM producto$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_todos_los_proveedores`()
    NO SQL
SELECT * FROM proveedor$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_todos_los_usuario`()
    NO SQL
SELECT * FROM usuario$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consultar_usuario_cliente_por_cedula`(IN `cedula` VARCHAR(15))
    NO SQL
SELECT * FROM vw_usuario_cliente WHERE DocumentoUsuario LIKE cedula$$

CREATE DEFINER=`mohansof`@`localhost` PROCEDURE `pa_consulta_usuarios`()
    READS SQL DATA
    COMMENT 'Leer la tabla de usuarios'
select * from usuario$$

--
-- Functions
--
CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_categoria_producto`(idCategoria INT, nombreCategoria VARCHAR(55),descripcion VARCHAR(125)) RETURNS int(11)
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
END$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_estado_categoria_producto`(idCategoria INT) RETURNS int(11)
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
END$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_estado_producto`(`idProducto` INT) RETURNS int(11)
    MODIFIES SQL DATA
IF EXISTS((SELECT * FROM producto WHERE IdProducto=idProducto)) THEN
    IF((SELECT EstadoProducto FROM producto WHERE IdProducto=idProducto)=1) THEN
        UPDATE producto SET EstadoProducto = 0
        WHERE IdProducto=idProducto;
        RETURN (SELECT IdProducto FROM producto WHERE IdProducto=idProducto);   
    ELSE
        UPDATE producto SET EstadoProducto = 1
        WHERE IdProducto=idProducto;
        RETURN (SELECT IdProducto FROM producto WHERE IdProducto=idProducto);
    END IF;
    
 ELSE
RETURN 0;
 END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_estado_proveedor`(`idProveedor` INT) RETURNS int(11)
    MODIFIES SQL DATA
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
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_estado_usuario`(`idUsuario` INT) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=idUsuario) THEN 
        IF((SELECT EstadoUsuario FROM usuario WHERE IdUsuario=idUsuario)=1) THEN 
            UPDATE usuario 
                    SET  EstadoUsuario = 0
                    WHERE IdUsuario=idUsuario ;	
        ELSE
            UPDATE usuario 
                    SET  EstadoUsuario = 1
                    WHERE IdUsuario=idUsuario ;	
        END IF;
    RETURN 1;
ELSE
    RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_producto`(`idProducto` INT, `codigo_producto` VARCHAR(20), `nombre_producto` VARCHAR(55), `descripcion_producto` VARCHAR(125), `fk_id_categoria` INT, `precio` DECIMAL) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM producto WHERE IdProducto=idProducto) THEN
        UPDATE producto 
        SET CodigoProducto= codigo_producto,
            NombreProducto=nombre_producto,
            DescripcionProducto=descripcion_producto,
            Fk_Id_Categoria=fk_id_categoria,
            PrecioVentaDefinitivo=precio
        WHERE IdProducto=idProducto
		LIMIT 1;
        RETURN 1;
ELSE
RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_proveedor`(`idProveedor` INT, `nombre` VARCHAR(55), `nombreContacto` VARCHAR(55), `telefonoContacto` VARCHAR(25), `correoContacto` VARCHAR(25)) RETURNS int(11)
    MODIFIES SQL DATA
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
    END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_actualizar_usuario`(`idUsuario` INT, `nombreUsuario` VARCHAR(25), `apellidoUsuario` VARCHAR(55), `documento` VARCHAR(15), `telefonoUsuario` VARCHAR(15), `celularUsuario` VARCHAR(15), `correoUsuario` VARCHAR(15)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=idUsuario) THEN 
 				UPDATE usuario 
                    SET  NombreUsuario=nombreUsuario,
                         ApellidoUsuario=apellidoUsuario,    
                         DocumentoUsuario=documento,
                         TelefonoUsuario=telefonoUsuario,
                         CelularUsuario=celularUsuario,
                         CorreoUsuario=correoUsuario  
                    WHERE IdUsuario=idUsuario
					LIMIT 1;	
   RETURN 1;
ELSE
   RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_asociar_producto_con_proveedor`(`id_producto` INT, `id_proveedor` INT, `cantidad` INT) RETURNS int(11)
    NO SQL
IF NOT EXISTS (SELECT IdDetalleProveedor FROM detalle_producto_proveedor WHERE Fk_Id_Producto=id_producto AND Fk_Id_Proveedor=id_proveedor) THEN 
            INSERT INTO detalle_producto_proveedor(Fk_id_Producto,Fk_Id_Proveedor,ExistenciasBodega)
            VALUES(id_producto,id_proveedor,cantidad);
            RETURN LAST_INSERT_ID();
        ELSE
				UPDATE detalle_producto_proveedor SET
				ExistenciasBodega = cantidad + ExistenciasBodega
				WHERE Fk_Id_Producto=id_producto 
				AND Fk_Id_Proveedor=id_proveedor;
		
         RETURN (SELECT IdDetalleProveedor FROM detalle_producto_proveedor WHERE Fk_Id_Producto=id_producto AND Fk_Id_Proveedor=id_proveedor);   
        END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_cambiar_clave`(`idUsuario` INT, `clave` VARCHAR(256)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM ingreso_aplicacion WHERE Fk_Id_Usuario=idUsuario) THEN
UPDATE ingreso_aplicacion 
	SET Clave=clave
	WHERE Fk_Id_Usuario=idUsuario
	LIMIT 1;
	RETURN 1;
ELSE  
	RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_consultar_codigo_entrada`() RETURNS int(11)
    NO SQL
IF((SELECT COUNT(*) FROM entradas)=0)THEN
 RETURN 1;
ELSE

	RETURN (SELECT COUNT(*) FROM entradas)+1;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_consultar_codigo_factura`() RETURNS int(11)
    NO SQL
IF((SELECT COUNT(*) FROM factura)=0)THEN
 RETURN 1;
ELSE

	RETURN (SELECT COUNT(*) FROM factura)+1;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_categoria_producto`(nombreCategoria VARCHAR(55),descripcion VARCHAR(125)) RETURNS int(11)
BEGIN
IF NOT EXISTS(SELECT * FROM categoria_producto WHERE NombreCategoriaProducto=nombreCategoria) THEN 
 	INSERT INTO categoria_producto (NombreCategoriaProducto,DescripcionCategoriaProducto) 
 	VALUES (nombreCategoria,descripcion);
RETURN LAST_INSERT_ID();    
ELSE
RETURN 0;
END IF; 
END$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_detalle_factura`(`fk_id_factura` INT, `fk_id_producto` INT, `cantidad` INT, `valor_producto` DECIMAL) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM factura WHERE IdFactura=fk_id_factura) THEN
	UPDATE producto SET 
	ExistenciasTotalBodega=ExistenciasTotalBodega-cantidad
	WHERE Idproducto=fk_id_producto;

	INSERT INTO detalle_factura_producto(Fk_Id_Factura, Fk_Id_Producto, Cantidad, ValorProducto)
    	VALUES(fk_id_factura,fk_id_producto,cantidad,valor_producto);
    RETURN LAST_INSERT_ID();
ELSE 
 RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_entrada`(`codigo_entrada` VARCHAR(10), `fecha_entrada` DATETIME, `fk_id_usuario_empleado` INT, `tipo_entrada` ENUM('Devolucion','Cambios','Obsequios','Pedido')) RETURNS int(11)
IF NOT EXISTS(SELECT * FROM entradas WHERE CodigoEntrada=codigo_entrada) THEN
        INSERT INTO entradas (CodigoEntrada, FechaEntrada, Fk_Id_Usuario_Empleado,TipoEntrada) VALUES(codigo_entrada,fecha_entrada, fk_id_usuario_empleado,tipo_entrada);
        RETURN LAST_INSERT_ID();
    ELSE
        RETURN 0;
    END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_entrada_otros`(`cantidad_devolucion` INT, `cometario_devolucion` VARCHAR(55), `id_entrada` INT) RETURNS int(11)
    NO SQL
IF  EXISTS(SELECT * FROM entradas WHERE IdEntrada=id_entrada) THEN
        INSERT INTO entrada_otros (CantidadEntrada,  CometarioDevolucion,Fk_id_Entrada)
            VALUES( cantidad_devolucion,   cometario_devolucion,id_entrada);
        RETURN LAST_INSERT_ID();    
     ELSE 
        RETURN 0;
     END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_entrada_pedido`(`fk_id_entrada` INT, `fk_id_detalle_producto_proveedor` INT, `cantidad_entrada` INT, `precio_proveedorEntrada` DECIMAL, `id_producto` INT) RETURNS int(11)
IF EXISTS(SELECT * FROM entradas WHERE IdEntrada=fk_id_entrada) THEN
           
	INSERT INTO entrada_pedido (Fk_Id_Entrada, Fk_Id_Detalle_Producto_Proveedor, CantidadEntrada, PrecioProveedorEntrada)
            VALUES(fk_id_entrada, fk_id_detalle_producto_proveedor, cantidad_entrada, precio_proveedorEntrada);
			
			SET @last_id = LAST_INSERT_ID();

			UPDATE producto SET ExistenciasTotalBodega=ExistenciasTotalBodega+cantidad_entrada WHERE IdProducto=id_producto;


            RETURN @last_id;    
        ELSE
            RETURN (SELECT IdEntrada FROM entradas WHERE IdEntrada=fk_id_entrada);
        END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_factura`(`codigo_factura` VARCHAR(10), `fecha_factura` DATETIME, `estado_factura` VARCHAR(10), `id_empleado` INT, `id_cliente` INT) RETURNS int(11)
    NO SQL
IF NOT EXISTS(SELECT * FROM factura WHERE CodigoFactura=codigo_factura) THEN
       INSERT INTO factura
	(CodigoFactura, 
         FechaFacturacion, 
         EstadoFactura, 
         Fk_Id_Usuario_Creador, 
         Fk_Id_Cliente)
VALUES(codigo_factura,
               fecha_factura,
               estado_factura,
               id_empleado,
               id_cliente);
        RETURN LAST_INSERT_ID();
    ELSE
        RETURN 0;
    END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_producto`(`codigo_producto` VARCHAR(20), `nombre_producto` VARCHAR(55), `descripcion_producto` VARCHAR(125), `fk_id_categoria` INT, `precio_venta` DECIMAL, `existencia_minima` INT) RETURNS int(11)
    NO SQL
IF NOT EXISTS(SELECT * FROM producto WHERE CodigoProducto=codigo_producto) THEN
    INSERT INTO producto(CodigoProducto, NombreProducto, DescripcionProducto, Fk_Id_Categoria,PrecioVentaDefinitivo,ExistenciasMinimas)
    VALUES (codigo_producto,nombre_producto,descripcion_producto,fk_id_categoria,precio_venta,existencia_minima);
    RETURN LAST_INSERT_ID();
ELSE
RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_proveedor`(`nombre` VARCHAR(55), `nombreContacto` VARCHAR(55), `telefonoContacto` VARCHAR(25), `correoContacto` VARCHAR(25), `nit` VARCHAR(25), `direccion` VARCHAR(55)) RETURNS int(11)
    MODIFIES SQL DATA
    COMMENT 'Funcion para la insercion de un proveedor'
IF NOT EXISTS(SELECT * FROM proveedor WHERE NombreProveedor=nombre ) THEN
        INSERT INTO proveedor(NombreProveedor, NombreContactoProveedor, TelefonoContactoProveedor, CorreoContactoProveedor,Nit,DireccionProveedor)
        VALUES(nombre,nombreContacto,telefonoContacto,correoContacto,nit,direccion);
    RETURN LAST_INSERT_ID();
    ELSE
    RETURN 0;
    END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_salida`(`codigo_salida` VARCHAR(10), `fecha_salida` DATETIME, `fk_id_usuario_empleado` INT, `tipo_salida` ENUM('Devolucion','Obsequios','Vencimiento','Averia','Venta')) RETURNS int(11)
    NO SQL
IF NOT EXISTS(SELECT CodigoSalida FROM salidas WHERE CodigoSalida=codigo_salida) THEN
	INSERT INTO salidas(CodigoSalida, FechaSalida, Fk_Id_Usuario_Empleado,TipoSalida)
        VALUES(codigo_salida, fecha_salida, fk_id_usuario_empleado,tipo_salida);
        
    RETURN LAST_INSERT_ID();
ELSE
	RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_salida_otros`(`fk_id_salida` INT, `fk_id_detalle_proveedor_producto` INT, `cantidad_devuelta` INT, `comentario_devolucion` VARCHAR(256), `id_producto` INT) RETURNS int(11)
    NO SQL
IF EXISTS (SELECT IdSalidas FROM salidas WHERE IdSalidas=fk_id_salida) THEN
	 
     	UPDATE detalle_producto_proveedor
	 		SET ExistenciasBodega=ExistenciasBodega-cantidad_devuelta,
			ExistenciasDevolucion=ExistenciasDevolucion+cantidad_devuelta
			WHERE IdDetalleProveedor=fk_id_detalle_proveedor_producto;
		
		UPDATE producto 
			SET ExistenciasTotalBodega=ExistenciasTotalBodega-cantidad_devuelta
			WHERE IdProducto=id_producto;

  	INSERT INTO salida_otros( Fk_Id_Salida, Fk_Id_Detalle_Proveedor_Producto, CantidadDevuelta, ComentarioDevolucion ) 
							VALUES(fk_id_salida,fk_id_detalle_proveedor_producto,cantidad_devuelta,comentario_devolucion);	
	RETURN LAST_INSERT_ID();
ELSE 
	RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_salida_venta`(`id_salida` INT, `id_factura` INT) RETURNS int(11)
    MODIFIES SQL DATA
IF EXISTS(SELECT idSalida FROM salidas WHERE IdSalida=id_salida ) THEN
	INSERT INTO salida_venta(Fk_Id_Salida,Fk_Id_dFactura)
        VALUES(id_salida, id_factura);
        
    RETURN LAST_INSERT_ID();
ELSE
 RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_usuario`(`nombreUsuario` VARCHAR(25), `apellidoUsuario` VARCHAR(25), `documento` VARCHAR(15), `telefonoUsuario` VARCHAR(15), `celularUsuario` VARCHAR(15), `correoUsuario` VARCHAR(55)) RETURNS int(11)
    NO SQL
IF NOT EXISTS(SELECT * FROM usuario WHERE DocumentoUsuario=documento AND CorreoUsuario=correoUsuario) THEN 
	
		INSERT INTO usuario (NombreUsuario, ApellidoUsuario, DocumentoUsuario, TelefonoUsuario, CelularUsuario, CorreoUsuario) 
 			VALUES (nombreUsuario,apellidoUsuario,documento,telefonoUsuario,celularUsuario,correoUsuario);
		RETURN LAST_INSERT_ID();
			
ELSE 
    RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registrar_usuario_cliente`(`id_usuario` INT, `tarjeta` VARCHAR(25)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=id_usuario) THEN 
        
 	  
        INSERT INTO cliente(Fk_Id_Usuario,NumeroTarjeta)
        VALUES(id_usuario,tarjeta);

   RETURN LAST_INSERT_ID();
ELSE
    RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registro_empleado`(`id` INT, `cargo` VARCHAR(25)) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=id) THEN
						INSERT INTO empleado(Fk_Id_Usuario_Empleado,Cargo)
        						VALUES(id,cargo);
				RETURN LAST_INSERT_ID();
ELSE
	RETURN 0;
END IF$$

CREATE DEFINER=`mohansof`@`localhost` FUNCTION `fun_registro_ingreso_aplicacion`(`id` INT, `clave` VARCHAR(256), `pregunta_seguridad` VARCHAR(256), `respuesta_seguridad` VARCHAR(256), `ultima_actividad` DATETIME) RETURNS int(11)
    NO SQL
IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=id) THEN

		INSERT INTO ingreso_aplicacion(Fk_Id_Usuario, Clave, PreguntaSeguridad, RespuestaSeguridad, UltimaActividad)
        			VALUES(id,clave,pregunta_seguridad,respuesta_seguridad,ultima_actividad);
                RETURN LAST_INSERT_ID();                    

            ELSE
                RETURN 0;
            END IF$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `categoria_producto`
--

CREATE TABLE IF NOT EXISTS `categoria_producto` (
  `IdCategoriaProducto` int(11) NOT NULL AUTO_INCREMENT,
  `NombreCategoriaProducto` varchar(55) NOT NULL,
  `DescripcionCategoriaProducto` varchar(125) NOT NULL,
  `EstadoCategoriaProducto` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdCategoriaProducto`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contiene la informacion de las categorias de los productos' AUTO_INCREMENT=31 ;

--
-- Dumping data for table `categoria_producto`
--

INSERT INTO `categoria_producto` (`IdCategoriaProducto`, `NombreCategoriaProducto`, `DescripcionCategoriaProducto`, `EstadoCategoriaProducto`) VALUES
(23, 'Frenos', 'todo en frenos', '1'),
(24, 'GuardaBarro', 'todo en guerdabarros', '0'),
(25, 'Prueb4', 'Prueba', '1'),
(26, 'prueba1', 'prueba', '0'),
(27, 'Prueba2', 'DescripcionDos', '1'),
(28, 'Death Metal 666', 'La muerte hecha musica.', '0'),
(29, '', '', '1'),
(30, 'Prueba 3', 'Prueba 3', '1');

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `IdUsuarioCliente` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `NumeroTarjeta` varchar(25) NOT NULL,
  PRIMARY KEY (`IdUsuarioCliente`),
  KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los clienets ' AUTO_INCREMENT=14 ;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`IdUsuarioCliente`, `Fk_Id_Usuario`, `NumeroTarjeta`) VALUES
(10, 30, 'N/A'),
(11, 33, 'N/A'),
(12, 34, 'N/A'),
(13, 36, 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `detalle_factura_producto`
--

CREATE TABLE IF NOT EXISTS `detalle_factura_producto` (
  `IdDetalleFacturaProducto` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Factura` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `ValorProducto` decimal(10,0) NOT NULL,
  `Descuento` float NOT NULL,
  PRIMARY KEY (`IdDetalleFacturaProducto`),
  KEY `Fk_Id_Factura` (`Fk_Id_Factura`,`Fk_Id_Producto`),
  KEY `Fk_Id_Producto` (`Fk_Id_Producto`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra el detalle de los productos listados en una factura' AUTO_INCREMENT=29 ;

--
-- Dumping data for table `detalle_factura_producto`
--

INSERT INTO `detalle_factura_producto` (`IdDetalleFacturaProducto`, `Fk_Id_Factura`, `Fk_Id_Producto`, `Cantidad`, `ValorProducto`, `Descuento`) VALUES
(10, 54, 7, 2, '246', 0),
(11, 54, 5, 3, '250500', 0),
(12, 55, 7, 2, '246', 0),
(13, 55, 5, 3, '250500', 0),
(14, 56, 7, 2, '246', 0),
(15, 56, 5, 3, '250500', 0),
(16, 61, 5, 2, '167000', 0),
(17, 63, 7, 2, '246', 0),
(18, 64, 7, 2, '246', 0),
(19, 65, 7, 2, '246', 0),
(20, 66, 9, 6, '75000', 0),
(21, 67, 9, 6, '75000', 0),
(22, 67, 5, 110, '9185000', 0),
(25, 70, 11, 146, '219000000', 0),
(26, 71, 7, 2, '246', 0),
(27, 71, 10, 2, '5000', 0),
(28, 75, 7, 2, '246', 0);

-- --------------------------------------------------------

--
-- Table structure for table `detalle_producto_proveedor`
--

CREATE TABLE IF NOT EXISTS `detalle_producto_proveedor` (
  `IdDetalleProveedor` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Producto` int(11) NOT NULL,
  `Fk_Id_Proveedor` int(11) NOT NULL,
  `EstadoDetalleProductoProveedor` int(11) NOT NULL DEFAULT '1',
  `PrecioSugeridoVenta` decimal(10,0) NOT NULL,
  `ExistenciasBodega` int(11) NOT NULL DEFAULT '0',
  `ExistenciasDevolucion` int(11) NOT NULL,
  PRIMARY KEY (`IdDetalleProveedor`),
  KEY `Fk_Id_Proveedor` (`Fk_Id_Proveedor`),
  KEY `Fk_Id_Producto` (`Fk_Id_Producto`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra la relacion de los productos suministrados por el proveedor' AUTO_INCREMENT=12 ;

--
-- Dumping data for table `detalle_producto_proveedor`
--

INSERT INTO `detalle_producto_proveedor` (`IdDetalleProveedor`, `Fk_Id_Producto`, `Fk_Id_Proveedor`, `EstadoDetalleProductoProveedor`, `PrecioSugeridoVenta`, `ExistenciasBodega`, `ExistenciasDevolucion`) VALUES
(3, 5, 4, 1, '0', 1, 5),
(5, 6, 4, 1, '0', -2, 2),
(6, 7, 4, 1, '0', 4, 2),
(7, 9, 4, 1, '0', 0, 0),
(8, 7, 5, 1, '0', 6, 0),
(9, 5, 5, 1, '0', 126, 4),
(10, 9, 5, 1, '0', 10, 0),
(11, 11, 4, 1, '0', 150, 0);

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE IF NOT EXISTS `empleado` (
  `IdUsuarioEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Usuario_Empleado` int(11) NOT NULL,
  `Cargo` varchar(25) NOT NULL,
  PRIMARY KEY (`IdUsuarioEmpleado`),
  KEY `Fk_Id_Usuario` (`Fk_Id_Usuario_Empleado`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los empleados de la empresa' AUTO_INCREMENT=9 ;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`IdUsuarioEmpleado`, `Fk_Id_Usuario_Empleado`, `Cargo`) VALUES
(1, 1, '1'),
(2, 2, '1'),
(6, 31, '1'),
(7, 32, '1'),
(8, 35, '1');

-- --------------------------------------------------------

--
-- Table structure for table `entidades`
--

CREATE TABLE IF NOT EXISTS `entidades` (
  `IdEntidad` int(11) NOT NULL AUTO_INCREMENT,
  `NombreEntidad` varchar(15) NOT NULL,
  `IdCrear` varchar(15) NOT NULL,
  `IdConsultar` varchar(15) NOT NULL,
  `IdActualizar` varchar(15) NOT NULL,
  `IdEliminar` varchar(15) NOT NULL,
  PRIMARY KEY (`IdEntidad`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `entidades`
--

INSERT INTO `entidades` (`IdEntidad`, `NombreEntidad`, `IdCrear`, `IdConsultar`, `IdActualizar`, `IdEliminar`) VALUES
(1, 'Usuario', 'crearUsu', 'buscarUsu', 'editarUsu', 'eliminarUsu'),
(2, 'Categoria', 'crearCat', 'busCat', 'ediCat', 'eliCat'),
(3, 'Producto', 'crearProd', 'busProd', 'ediProd', 'eliProd'),
(4, 'Proveedor', 'crearProv', 'busProv', 'ediProv', 'eliProv'),
(5, 'Entrada', 'entPed', '', '', ''),
(6, 'Salida', 'crearSal', 'busSal', '', ''),
(7, 'Ventas', 'fac', '', '', ''),
(8, 'EntradaOtros', 'entOt', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `entradas`
--

CREATE TABLE IF NOT EXISTS `entradas` (
  `IdEntrada` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoEntrada` varchar(10) NOT NULL,
  `FechaEntrada` datetime NOT NULL,
  `Fk_Id_Usuario_Empleado` int(11) NOT NULL,
  `TipoEntrada` enum('Devolucion','Obsequios','Cambios','Pedido') NOT NULL,
  PRIMARY KEY (`IdEntrada`),
  KEY `Fk_Id_Usuario_Empleado` (`Fk_Id_Usuario_Empleado`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las entradas de mercancia' AUTO_INCREMENT=87 ;

--
-- Dumping data for table `entradas`
--

INSERT INTO `entradas` (`IdEntrada`, `CodigoEntrada`, `FechaEntrada`, `Fk_Id_Usuario_Empleado`, `TipoEntrada`) VALUES
(75, '222', '2016-07-04 11:53:53', 1, 'Pedido'),
(76, '123', '2016-07-05 22:48:00', 1, 'Pedido'),
(77, '2', '2016-07-06 12:41:21', 1, 'Pedido'),
(78, '', '2016-07-06 12:58:25', 1, 'Pedido'),
(79, '333', '2016-07-09 08:46:23', 1, 'Pedido'),
(86, '6', '2016-07-11 00:38:24', 1, 'Pedido');

-- --------------------------------------------------------

--
-- Table structure for table `entrada_otros`
--

CREATE TABLE IF NOT EXISTS `entrada_otros` (
  `IdEntradaDevolucion` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Detalle_Factura` int(11) DEFAULT NULL,
  `CantidadEntrada` int(11) NOT NULL,
  `EstadoDevolucion` varchar(11) NOT NULL,
  `CometarioDevolucion` varchar(256) NOT NULL,
  `Fk_Id_Entrada` int(11) NOT NULL,
  PRIMARY KEY (`IdEntradaDevolucion`),
  KEY `Fk_Id_Detalle_Factura` (`Fk_Id_Detalle_Factura`),
  KEY `Fk_Id_Detalle_Factura_2` (`Fk_Id_Detalle_Factura`),
  KEY `Fk_Id_Entrada` (`Fk_Id_Entrada`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra el detalle de las devoluciones de productos vendidos' AUTO_INCREMENT=16 ;

--
-- Dumping data for table `entrada_otros`
--

INSERT INTO `entrada_otros` (`IdEntradaDevolucion`, `Fk_Id_Detalle_Factura`, `CantidadEntrada`, `EstadoDevolucion`, `CometarioDevolucion`, `Fk_Id_Entrada`) VALUES
(15, NULL, 23, '', 'sin comentarios', 74);

-- --------------------------------------------------------

--
-- Table structure for table `entrada_pedido`
--

CREATE TABLE IF NOT EXISTS `entrada_pedido` (
  `IdEntradaPedido` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Entrada` int(11) NOT NULL,
  `Fk_Id_Detalle_Producto_Proveedor` int(11) NOT NULL,
  `CantidadEntrada` int(11) NOT NULL,
  `PrecioProveedorEntrada` decimal(10,0) NOT NULL,
  PRIMARY KEY (`IdEntradaPedido`),
  KEY `Fk_Id_Entrada` (`Fk_Id_Entrada`,`Fk_Id_Detalle_Producto_Proveedor`),
  KEY `Fk_Id_Entrada_2` (`Fk_Id_Entrada`),
  KEY `Fk_Id_Detalle_Producto_Proveedor` (`Fk_Id_Detalle_Producto_Proveedor`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra el tipo de entrada pedidos' AUTO_INCREMENT=71 ;

--
-- Dumping data for table `entrada_pedido`
--

INSERT INTO `entrada_pedido` (`IdEntradaPedido`, `Fk_Id_Entrada`, `Fk_Id_Detalle_Producto_Proveedor`, `CantidadEntrada`, `PrecioProveedorEntrada`) VALUES
(64, 75, 6, 2, '13'),
(65, 76, 6, 2, '2'),
(66, 77, 3, 2, '2'),
(67, 78, 3, 2, '2'),
(68, 78, 3, 2, '2'),
(69, 79, 11, 150, '123'),
(70, 86, 6, 2, '233');

-- --------------------------------------------------------

--
-- Table structure for table `factura`
--

CREATE TABLE IF NOT EXISTS `factura` (
  `IdFactura` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoFactura` varchar(10) NOT NULL,
  `FechaFacturacion` datetime NOT NULL,
  `EstadoFactura` enum('Cancelada','Sin Despachar','Devuelta','Despachada') NOT NULL,
  `Fk_Id_Usuario_Creador` int(11) NOT NULL,
  `Fk_Id_Cliente` int(11) NOT NULL,
  PRIMARY KEY (`IdFactura`),
  KEY `Fk_Id_Usuario_Creador` (`Fk_Id_Usuario_Creador`,`Fk_Id_Cliente`),
  KEY `Fk_Id_Usuario_Creador_2` (`Fk_Id_Usuario_Creador`),
  KEY `Fk_Id_Cliente` (`Fk_Id_Cliente`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los detalles de la factura' AUTO_INCREMENT=76 ;

--
-- Dumping data for table `factura`
--

INSERT INTO `factura` (`IdFactura`, `CodigoFactura`, `FechaFacturacion`, `EstadoFactura`, `Fk_Id_Usuario_Creador`, `Fk_Id_Cliente`) VALUES
(54, '1', '2016-07-03 14:19:47', 'Despachada', 1, 10),
(55, '2', '2016-07-06 12:52:54', 'Despachada', 1, 11),
(56, '3', '2016-07-06 12:53:47', 'Despachada', 1, 11),
(61, '4', '2016-07-06 18:15:02', 'Despachada', 1, 11),
(63, '5', '2016-07-06 18:18:56', 'Despachada', 1, 12),
(64, '6', '2016-07-09 08:09:33', 'Despachada', 1, 11),
(65, '7', '2016-07-09 08:32:52', 'Despachada', 1, 11),
(66, '8', '2016-07-09 08:34:07', 'Despachada', 1, 11),
(67, '9', '2016-07-09 08:43:22', 'Despachada', 1, 11),
(70, '10', '2016-07-09 08:51:40', 'Despachada', 1, 11),
(71, '11', '2016-07-09 09:58:12', 'Despachada', 1, 11),
(75, '12', '2016-07-11 01:47:11', 'Despachada', 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `impuestos`
--

CREATE TABLE IF NOT EXISTS `impuestos` (
  `IdImpuesto` int(11) NOT NULL AUTO_INCREMENT,
  `NombreImpuesto` varchar(11) NOT NULL,
  `ValorImpuesto` int(11) NOT NULL,
  PRIMARY KEY (`IdImpuesto`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COMMENT='Taabla que contiene el valor de impuestos aplicados a la venta' AUTO_INCREMENT=2 ;

--
-- Dumping data for table `impuestos`
--

INSERT INTO `impuestos` (`IdImpuesto`, `NombreImpuesto`, `ValorImpuesto`) VALUES
(1, 'IVA', 16);

-- --------------------------------------------------------

--
-- Table structure for table `ingreso_aplicacion`
--

CREATE TABLE IF NOT EXISTS `ingreso_aplicacion` (
  `IdIngresoAplicacion` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `Clave` varchar(256) NOT NULL,
  `PreguntaSeguridad` varchar(55) NOT NULL,
  `RespuestaSeguridad` varchar(55) NOT NULL,
  `UltimaActividad` datetime DEFAULT NULL,
  `EstadoIngreso` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdIngresoAplicacion`),
  KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que cnytendra los datos de los usuarios que pueden ingresar a la aplicacio' AUTO_INCREMENT=8 ;

--
-- Dumping data for table `ingreso_aplicacion`
--

INSERT INTO `ingreso_aplicacion` (`IdIngresoAplicacion`, `Fk_Id_Usuario`, `Clave`, `PreguntaSeguridad`, `RespuestaSeguridad`, `UltimaActividad`, `EstadoIngreso`) VALUES
(3, 1, '123', 'null', 'null', '2016-07-10 13:33:14', '1'),
(4, 2, '123', 'null', 'null', '2016-07-03 06:33:51', '1'),
(5, 31, '123', 'null', 'null', '2016-07-05 09:19:46', '1'),
(6, 32, '123', 'null', 'null', '2016-07-10 22:01:18', '1'),
(7, 35, '1020768079', 'null', 'null', '2016-07-07 08:19:08', '1');

-- --------------------------------------------------------

--
-- Table structure for table `permisos`
--

CREATE TABLE IF NOT EXISTS `permisos` (
  `IdPermiso` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Entidad` int(11) NOT NULL,
  `Fk_Id_Rol` int(11) NOT NULL,
  `Crear` int(11) NOT NULL,
  `Eliminar` int(11) NOT NULL,
  `Actualizar` int(11) NOT NULL,
  `Consultar` int(11) NOT NULL,
  PRIMARY KEY (`IdPermiso`),
  KEY `Fk_Id_Entidad` (`Fk_Id_Entidad`),
  KEY `Fk_Id_Rol` (`Fk_Id_Rol`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `permisos`
--

INSERT INTO `permisos` (`IdPermiso`, `Fk_Id_Entidad`, `Fk_Id_Rol`, `Crear`, `Eliminar`, `Actualizar`, `Consultar`) VALUES
(1, 1, 1, 1, 1, 1, 1),
(2, 2, 1, 1, 1, 1, 1),
(3, 3, 1, 1, 1, 1, 1),
(4, 4, 1, 1, 1, 1, 1),
(5, 5, 1, 1, 1, 1, 1),
(6, 6, 1, 1, 1, 1, 1),
(7, 7, 1, 1, 1, 1, 1),
(8, 1, 2, 0, 0, 0, 1),
(9, 2, 2, 0, 0, 0, 1),
(10, 3, 2, 0, 0, 0, 1),
(11, 4, 2, 0, 0, 0, 1),
(12, 5, 2, 0, 0, 0, 1),
(13, 6, 2, 0, 0, 0, 1),
(14, 7, 2, 0, 0, 0, 1),
(15, 1, 3, 0, 0, 0, 1),
(16, 2, 3, 0, 0, 0, 1),
(17, 3, 3, 0, 0, 0, 1),
(18, 4, 3, 0, 0, 0, 1),
(19, 5, 3, 0, 0, 0, 1),
(20, 6, 3, 0, 0, 0, 1),
(21, 7, 3, 0, 0, 0, 1),
(22, 8, 1, 1, 1, 1, 1),
(23, 8, 2, 0, 0, 0, 0),
(24, 8, 3, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE IF NOT EXISTS `producto` (
  `IdProducto` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoProducto` varchar(20) NOT NULL,
  `NombreProducto` varchar(55) NOT NULL,
  `DescripcionProducto` varchar(125) NOT NULL,
  `Fk_Id_Categoria` int(11) NOT NULL,
  `PrecioVentaDefinitivo` decimal(10,0) NOT NULL,
  `EstadoProducto` int(11) NOT NULL DEFAULT '1',
  `ExistenciasTotalBodega` int(11) NOT NULL,
  `ExistenciasTotalTienda` int(11) NOT NULL,
  `ExistenciasMinimas` int(11) NOT NULL,
  PRIMARY KEY (`IdProducto`),
  KEY `Fk_Id_Categoria` (`Fk_Id_Categoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contiene la informacion de los productos' AUTO_INCREMENT=12 ;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`IdProducto`, `CodigoProducto`, `NombreProducto`, `DescripcionProducto`, `Fk_Id_Categoria`, `PrecioVentaDefinitivo`, `EstadoProducto`, `ExistenciasTotalBodega`, `ExistenciasTotalTienda`, `ExistenciasMinimas`) VALUES
(5, '666', 'Freno AB+', 'Freno automatizado ultima generación', 23, '83500', 1, 0, 0, 0),
(6, '777', 'Guarda Barro doble', 'Guarda barros especial para tu vehiculo', 24, '0', 1, 0, 0, 0),
(7, '123', 'LLantas 27" x 2', 'Una lujosa llanta para su vehiculo de traccion animal', 25, '123', 1, 236, 0, 0),
(8, '1000000101', 'TUERCA', 'PARTE DERECHA', 26, '0', 1, 0, 0, 0),
(9, '999', 'Freno de mano', 'un excelente feno de Mano', 28, '12500', 1, -2, 0, 0),
(10, '654789', 'un nombre muy particular', 'Uyyy', 23, '2500', 1, 4, 0, 0),
(11, '654321', 'Chasis', 'Chasis ford f150', 23, '1500000', 1, 4, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `proveedor`
--

CREATE TABLE IF NOT EXISTS `proveedor` (
  `IdProveedor` int(11) NOT NULL AUTO_INCREMENT,
  `NombreProveedor` varchar(55) NOT NULL,
  `NombreContactoProveedor` varchar(55) NOT NULL,
  `TelefonoContactoProveedor` varchar(25) NOT NULL,
  `CorreoContactoProveedor` varchar(25) NOT NULL,
  `EstadoProveedor` int(11) NOT NULL DEFAULT '1',
  `Nit` varchar(25) NOT NULL,
  `DireccionProveedor` varchar(55) NOT NULL,
  PRIMARY KEY (`IdProveedor`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra la informacion de los proveedores' AUTO_INCREMENT=8 ;

--
-- Dumping data for table `proveedor`
--

INSERT INTO `proveedor` (`IdProveedor`, `NombreProveedor`, `NombreContactoProveedor`, `TelefonoContactoProveedor`, `CorreoContactoProveedor`, `EstadoProveedor`, `Nit`, `DireccionProveedor`) VALUES
(4, 'Soy un nuevo proveedor', 'Edgar Guzman Vargas', '3171669546', 'edgar.guzman21@gmail.com', 1, '123', '123'),
(5, 'Carach Angren', 'Death Came Through a phantom ship', '656565', 'hellwhite@misena.edu.co', 1, '666', 'Calle siempre viva'),
(6, 'CHEVROLET', 'LUIS MORENO', '3006572784', 'LUISMORENO@HOTMAIL.COM', 1, '91112902177', ''),
(7, 'D1 Dtodos', 'mi primo pedro', '7323251', 'micorre@hot.com', 1, '1234567890', '');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
  `NombreRol` varchar(55) NOT NULL,
  `IdRol` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IdRol`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`NombreRol`, `IdRol`) VALUES
('Administrador', 1),
('Auxiliar Cajero', 2),
('Cajero', 3);

-- --------------------------------------------------------

--
-- Table structure for table `salidas`
--

CREATE TABLE IF NOT EXISTS `salidas` (
  `IdSalidas` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoSalida` varchar(10) NOT NULL,
  `FechaSalida` datetime NOT NULL,
  `Fk_Id_Usuario_Empleado` int(11) NOT NULL,
  `TipoSalida` enum('Devolucion','Obsequios','Vencimiento','Averia','Venta') NOT NULL,
  PRIMARY KEY (`IdSalidas`),
  KEY `Fk_Id_Usuario_Empleado` (`Fk_Id_Usuario_Empleado`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las salidas realizadas' AUTO_INCREMENT=3 ;

--
-- Dumping data for table `salidas`
--

INSERT INTO `salidas` (`IdSalidas`, `CodigoSalida`, `FechaSalida`, `Fk_Id_Usuario_Empleado`, `TipoSalida`) VALUES
(1, '123', '2016-07-11 01:20:43', 1, 'Devolucion'),
(2, '12', '2016-07-11 01:47:11', 1, 'Venta');

-- --------------------------------------------------------

--
-- Table structure for table `salida_otros`
--

CREATE TABLE IF NOT EXISTS `salida_otros` (
  `IdSalidaDevolucion` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Salida` int(11) NOT NULL,
  `Fk_Id_Detalle_Proveedor_Producto` int(11) NOT NULL,
  `CantidadDevuelta` int(11) NOT NULL,
  `ComentarioDevolucion` varchar(256) NOT NULL,
  PRIMARY KEY (`IdSalidaDevolucion`),
  KEY `Fk_Id_Salida` (`Fk_Id_Salida`,`Fk_Id_Detalle_Proveedor_Producto`),
  KEY `Fk_Id_Detalle_Proveedor_Producto` (`Fk_Id_Detalle_Proveedor_Producto`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las devoluciones a los proveedores' AUTO_INCREMENT=2 ;

--
-- Dumping data for table `salida_otros`
--

INSERT INTO `salida_otros` (`IdSalidaDevolucion`, `Fk_Id_Salida`, `Fk_Id_Detalle_Proveedor_Producto`, `CantidadDevuelta`, `ComentarioDevolucion`) VALUES
(1, 1, 6, 2, 'ninguna');

-- --------------------------------------------------------

--
-- Table structure for table `salida_venta`
--

CREATE TABLE IF NOT EXISTS `salida_venta` (
  `IdSalidaVenta` int(11) NOT NULL AUTO_INCREMENT,
  `Fk_Id_Salida` int(11) NOT NULL,
  `Fk_Id_Factura_Salida_Venta` int(11) NOT NULL,
  PRIMARY KEY (`IdSalidaVenta`),
  KEY `Fk_Id_Salida` (`Fk_Id_Salida`,`Fk_Id_Factura_Salida_Venta`),
  KEY `Fk_Id_Factura` (`Fk_Id_Factura_Salida_Venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las salidas por venta' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(25) NOT NULL,
  `ApellidoUsuario` varchar(25) NOT NULL,
  `DocumentoUsuario` varchar(15) NOT NULL,
  `TelefonoUsuario` varchar(15) NOT NULL,
  `CelularUsuario` varchar(15) NOT NULL,
  `CorreoUsuario` varchar(55) NOT NULL,
  `EstadoUsuario` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los usuarios registrados en la aplicacion' AUTO_INCREMENT=37 ;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `NombreUsuario`, `ApellidoUsuario`, `DocumentoUsuario`, `TelefonoUsuario`, `CelularUsuario`, `CorreoUsuario`, `EstadoUsuario`) VALUES
(1, 'Edgar Guzman V', 'Guzman V', '666', 'null', 'null', 'edgar@mohansoft.com', 1),
(2, 'Stalin', 'Chacon', '6667', 'null', 'null', 'stalin@mohansoft.com', 1),
(30, 'jairo mendez', 'N/A', '1234', 'N/A', 'N/A', 'N/A', 1),
(31, 'Pedro Luis Moreno Munoz M', 'Moreno Munoz', '1022937885', 'null', 'null', 'pedrin8965@gmail.com', 1),
(32, 'Pedro', 'Moreno', '1235', 'null', 'null', 'pedro@mohansoft.com', 1),
(33, 'Jose Stalib', 'N/A', '1230', 'N/A', 'N/A', 'N/A', 1),
(34, 'juan', 'N/A', '2345', 'N/A', 'N/A', 'N/A', 1),
(35, 'Andrea', 'Lugo', '1020768079', 'null', 'null', 'andreita-911@hotmail.es', 1),
(36, 'jose jose', 'N/A', '123', 'N/A', 'N/A', 'N/A', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `Fk_Usuario_Cliente` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalle_factura_producto`
--
ALTER TABLE `detalle_factura_producto`
  ADD CONSTRAINT `detalle_factura` FOREIGN KEY (`Fk_Id_Factura`) REFERENCES `factura` (`IdFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_fatura_producto` FOREIGN KEY (`Fk_Id_Producto`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalle_producto_proveedor`
--
ALTER TABLE `detalle_producto_proveedor`
  ADD CONSTRAINT `Fk_detalle_producto` FOREIGN KEY (`Fk_Id_Producto`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Fk_detalle_proveedor` FOREIGN KEY (`Fk_Id_Proveedor`) REFERENCES `proveedor` (`IdProveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `Fk_Usuario_Empleado` FOREIGN KEY (`Fk_Id_Usuario_Empleado`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `Fk_Empleado` FOREIGN KEY (`Fk_Id_Usuario_Empleado`) REFERENCES `empleado` (`IdUsuarioEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `entrada_otros`
--
ALTER TABLE `entrada_otros`
  ADD CONSTRAINT `Fk_Detalle_Factura` FOREIGN KEY (`Fk_Id_Detalle_Factura`) REFERENCES `detalle_factura_producto` (`IdDetalleFacturaProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `entrada_pedido`
--
ALTER TABLE `entrada_pedido`
  ADD CONSTRAINT `Fk_Detalle_Proveedor_Producto` FOREIGN KEY (`Fk_Id_Detalle_Producto_Proveedor`) REFERENCES `detalle_producto_proveedor` (`IdDetalleProveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Fk_Entrada` FOREIGN KEY (`Fk_Id_Entrada`) REFERENCES `entradas` (`IdEntrada`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `Fk_Cliente` FOREIGN KEY (`Fk_Id_Cliente`) REFERENCES `cliente` (`IdUsuarioCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Fk_Empleado_Factura` FOREIGN KEY (`Fk_Id_Usuario_Creador`) REFERENCES `empleado` (`IdUsuarioEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ingreso_aplicacion`
--
ALTER TABLE `ingreso_aplicacion`
  ADD CONSTRAINT `Fk_Usuario` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `Fk_Categoria_Producto` FOREIGN KEY (`Fk_Id_Categoria`) REFERENCES `categoria_producto` (`IdCategoriaProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `salidas`
--
ALTER TABLE `salidas`
  ADD CONSTRAINT `Fk_Salida_Empleado` FOREIGN KEY (`Fk_Id_Usuario_Empleado`) REFERENCES `empleado` (`IdUsuarioEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `salida_otros`
--
ALTER TABLE `salida_otros`
  ADD CONSTRAINT `Fk_Detalle_Producto_Proveedor` FOREIGN KEY (`Fk_Id_Detalle_Proveedor_Producto`) REFERENCES `detalle_producto_proveedor` (`IdDetalleProveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Fk_Salida` FOREIGN KEY (`Fk_Id_Salida`) REFERENCES `salidas` (`IdSalidas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `salida_venta`
--
ALTER TABLE `salida_venta`
  ADD CONSTRAINT `Fk_Id_Factura_Venta` FOREIGN KEY (`Fk_Id_Factura_Salida_Venta`) REFERENCES `factura` (`IdFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Fk_Salida_Venta` FOREIGN KEY (`Fk_Id_Salida`) REFERENCES `salidas` (`IdSalidas`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
