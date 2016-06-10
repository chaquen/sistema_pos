-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.16.5.179:3307
-- Tiempo de generación: 10-06-2016 a las 00:39:19
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `pos_mohansoft`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

CREATE TABLE IF NOT EXISTS `categoria_producto` (
`IdCategoriaProducto` int(11) NOT NULL,
  `NombreCategoriaProducto` varchar(55) NOT NULL,
  `DescripcionCategoriaProducto` varchar(125) NOT NULL,
  `EstadoCategoriaProducto` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf32 COMMENT='Tabla que contiene la informacion de las categorias de los productos';

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`IdCategoriaProducto`, `NombreCategoriaProducto`, `DescripcionCategoriaProducto`, `EstadoCategoriaProducto`) VALUES
(1, 'La Primera', 'Una breve descripcion1', '1'),
(2, 'Perico', 'perez', '0'),
(3, 'JOSEFINA', 'UNA MUY BREVE NUEVA DESCRIPCION', '1'),
(4, 'Prueba0', 'Una breve descripcion1', '1'),
(5, 'Prueba2', 'Prueba2', '1'),
(6, 'UNA ', 'MAS', '1'),
(7, 'HOLA', 'CARE BOLA', '1'),
(8, 'Prueba1', 'Una breve descripcion1', '1'),
(9, 'Pruea1', 'Una breve descripcion1', '1'),
(10, 'Prua1', 'Una breve descripcion1', '1'),
(11, 'papa', 'Una breve descripcion1', '1'),
(12, 'papapapa', 'Una breve descripcion1', '1'),
(13, 'papapa', 'Una breve descripcion1', '1'),
(14, 'papap', 'Una breve descripcion1', '1'),
(15, 'Careculo', 'Una breve descripcion1', '1'),
(16, 'Careculito', 'Una breve descripcion1', '1'),
(17, 'UO', 'JJA', '1'),
(18, 'kareculito', 'Una breve descripcion1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
`IdUsuarioCliente` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `NumeroTarjeta` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los clienets ';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura_producto`
--

CREATE TABLE IF NOT EXISTS `detalle_factura_producto` (
`IdDetalleFacturaProducto` int(11) NOT NULL,
  `Fk_Id_Factura` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `ValorProducto` decimal(10,0) NOT NULL,
  `Descuento` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra el detalle de los productos listados en una factura';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_producto_proveedor`
--

CREATE TABLE IF NOT EXISTS `detalle_producto_proveedor` (
`IdDetalleProveedor` int(11) NOT NULL,
  `Fk_Id_Producto` int(11) NOT NULL,
  `Fk_Id_Proveedor` int(11) NOT NULL,
  `EstadoDetalleProductoProveedor` int(11) NOT NULL,
  `PrecioSugeridoVenta` decimal(10,0) NOT NULL,
  `ExistenciasBodega` int(11) NOT NULL,
  `ExistenciasDevolucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra la relacion de los productos suministrados por el proveedor';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE IF NOT EXISTS `empleado` (
`IdUsuarioEmpleado` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `Cargo` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los empleados de la empresa';

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`IdUsuarioEmpleado`, `Fk_Id_Usuario`, `Cargo`) VALUES
(1, 1, '0'),
(2, 2, 'perit');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradas`
--

CREATE TABLE IF NOT EXISTS `entradas` (
`IdEntrada` int(11) NOT NULL,
  `CodigoEntrada` varchar(10) NOT NULL,
  `FechaEntrada` datetime NOT NULL,
  `Fk_Id_Usuario_Empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las entradas de mercancia';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_devolucion`
--

CREATE TABLE IF NOT EXISTS `entrada_devolucion` (
`IdEntradaDevolucion` int(11) NOT NULL,
  `Fk_Id_Detalle_Factura` int(11) NOT NULL,
  `CantidadDevolucion` int(11) NOT NULL,
  `EstadoDevolucion` varchar(11) NOT NULL,
  `CometarioDevolucion` varchar(256) NOT NULL,
  `Fk_Id_Entrada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra el detalle de las devoluciones de productos vendidos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_pedido`
--

CREATE TABLE IF NOT EXISTS `entrada_pedido` (
`IdEntradaPedido` int(11) NOT NULL,
  `Fk_Id_Entrada` int(11) NOT NULL,
  `Fk_Id_Detalle_Producto_Proveedor` int(11) NOT NULL,
  `CantidadEntrada` int(11) NOT NULL,
  `PrecioProveedorEntrada` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra el tipo de entrada pedidos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE IF NOT EXISTS `factura` (
`IdFactura` int(11) NOT NULL,
  `CodigoFactura` varchar(10) NOT NULL,
  `FechaFacturacion` datetime NOT NULL,
  `EstadoFactura` enum('Cancelada','Sin Despachar','Devuelta','Despachada') NOT NULL,
  `Fk_Id_Usuario_Creador` int(11) NOT NULL,
  `Fk_Id_Cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los detalles de la factura';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso_aplicacion`
--

CREATE TABLE IF NOT EXISTS `ingreso_aplicacion` (
`IdIngresoAplicacion` int(11) NOT NULL,
  `Fk_Id_Usuario` int(11) NOT NULL,
  `Clave` varchar(256) NOT NULL,
  `PreguntaSeguridad` varchar(55) NOT NULL,
  `RespuestaSeguridad` varchar(55) NOT NULL,
  `UltimaActividad` datetime DEFAULT NULL,
  `EstadoIngreso` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf32 COMMENT='Tabla que cnytendra los datos de los usuarios que pueden ingresar a la aplicacio';

--
-- Volcado de datos para la tabla `ingreso_aplicacion`
--

INSERT INTO `ingreso_aplicacion` (`IdIngresoAplicacion`, `Fk_Id_Usuario`, `Clave`, `PreguntaSeguridad`, `RespuestaSeguridad`, `UltimaActividad`, `EstadoIngreso`) VALUES
(1, 1, '123456', 'quien soy yo?', 'si usted no sabe menos yo.', '0000-00-00 00:00:00', '1'),
(2, 2, '123456', 'quien soy yo?', 'si usted no sabe menos yo.', '0000-00-00 00:00:00', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE IF NOT EXISTS `producto` (
`IdProducto` int(11) NOT NULL,
  `CodigoProducto` varchar(20) NOT NULL,
  `NombreProducto` varchar(55) NOT NULL,
  `DescripcionProducto` varchar(125) NOT NULL,
  `Fk_Id_Categoria` int(11) NOT NULL,
  `PrecioVentaDefinitivo` decimal(10,0) NOT NULL,
  `EstadoProducto` int(11) NOT NULL,
  `ExistenciasTotalBodega` int(11) NOT NULL,
  `ExistenciasTotalTienda` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf32 COMMENT='Tabla que contiene la informacion de los productos';

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`IdProducto`, `CodigoProducto`, `NombreProducto`, `DescripcionProducto`, `Fk_Id_Categoria`, `PrecioVentaDefinitivo`, `EstadoProducto`, `ExistenciasTotalBodega`, `ExistenciasTotalTienda`) VALUES
(1, '666', 'papitas con yuca', 'unas ppas mas ricas', 2, '0', 1, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE IF NOT EXISTS `proveedor` (
`IdProveedor` int(11) NOT NULL,
  `NombreProveedor` varchar(55) NOT NULL,
  `NombreContactoProveedor` varchar(55) NOT NULL,
  `TelefonoContactoProveedor` varchar(25) NOT NULL,
  `CorreoContactoProveedor` varchar(25) NOT NULL,
  `EstadoProveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra la informacion de los proveedores';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidas`
--

CREATE TABLE IF NOT EXISTS `salidas` (
`IdSalidas` int(11) NOT NULL,
  `CodigoSalida` varchar(10) NOT NULL,
  `FechaSalida` datetime NOT NULL,
  `Fk_Id_Usuario_Empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las salidas realizadas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_devolucion`
--

CREATE TABLE IF NOT EXISTS `salida_devolucion` (
`IdSalidaDevolucion` int(11) NOT NULL,
  `Fk_Id_Salida` int(11) NOT NULL,
  `Fk_Id_Detalle_Proveedor_Producto` int(11) NOT NULL,
  `CantidadDevuelta` int(11) NOT NULL,
  `ComentarioDevolucion` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las devoluciones a los proveedores';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_venta`
--

CREATE TABLE IF NOT EXISTS `salida_venta` (
`IdSalidaVenta` int(11) NOT NULL,
  `Fk_Id_Salida` int(11) NOT NULL,
  `Fk_Id_Factura_Salida_Venta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra las salidas por venta';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
`IdUsuario` int(11) NOT NULL,
  `NombreUsuario` varchar(25) NOT NULL,
  `ApellidoUsuario` varchar(25) NOT NULL,
  `DocumentoUsuario` varchar(15) NOT NULL,
  `TelefonoUsuario` varchar(15) NOT NULL,
  `CelularUsuario` varchar(15) NOT NULL,
  `CorreoUsuario` varchar(55) NOT NULL,
  `EstadoUsuario` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf32 COMMENT='Tabla que contendra los usuarios registrados en la aplicacion';

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `NombreUsuario`, `ApellidoUsuario`, `DocumentoUsuario`, `TelefonoUsuario`, `CelularUsuario`, `CorreoUsuario`, `EstadoUsuario`) VALUES
(1, 'Edgar', 'Guzman', '1073684233', '7323251', '3172269546', 'edgar@mohansoft.com', 0),
(2, 'Edgar', 'Guzman', '173684233', '7323251', '3172269546', 'edgar@mohansot.com', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
 ADD PRIMARY KEY (`IdCategoriaProducto`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
 ADD PRIMARY KEY (`IdUsuarioCliente`), ADD KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`);

--
-- Indices de la tabla `detalle_factura_producto`
--
ALTER TABLE `detalle_factura_producto`
 ADD PRIMARY KEY (`IdDetalleFacturaProducto`), ADD KEY `Fk_Id_Factura` (`Fk_Id_Factura`,`Fk_Id_Producto`), ADD KEY `Fk_Id_Producto` (`Fk_Id_Producto`);

--
-- Indices de la tabla `detalle_producto_proveedor`
--
ALTER TABLE `detalle_producto_proveedor`
 ADD PRIMARY KEY (`IdDetalleProveedor`), ADD KEY `Fk_Id_Proveedor` (`Fk_Id_Proveedor`), ADD KEY `Fk_Id_Producto` (`Fk_Id_Producto`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
 ADD PRIMARY KEY (`IdUsuarioEmpleado`);

--
-- Indices de la tabla `entradas`
--
ALTER TABLE `entradas`
 ADD PRIMARY KEY (`IdEntrada`), ADD KEY `Fk_Id_Usuario_Empleado` (`Fk_Id_Usuario_Empleado`);

--
-- Indices de la tabla `entrada_devolucion`
--
ALTER TABLE `entrada_devolucion`
 ADD PRIMARY KEY (`IdEntradaDevolucion`), ADD KEY `Fk_Id_Detalle_Factura` (`Fk_Id_Detalle_Factura`), ADD KEY `Fk_Id_Detalle_Factura_2` (`Fk_Id_Detalle_Factura`), ADD KEY `Fk_Id_Entrada` (`Fk_Id_Entrada`);

--
-- Indices de la tabla `entrada_pedido`
--
ALTER TABLE `entrada_pedido`
 ADD PRIMARY KEY (`IdEntradaPedido`), ADD KEY `Fk_Id_Entrada` (`Fk_Id_Entrada`,`Fk_Id_Detalle_Producto_Proveedor`), ADD KEY `Fk_Id_Entrada_2` (`Fk_Id_Entrada`), ADD KEY `Fk_Id_Detalle_Producto_Proveedor` (`Fk_Id_Detalle_Producto_Proveedor`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
 ADD PRIMARY KEY (`IdFactura`), ADD KEY `Fk_Id_Usuario_Creador` (`Fk_Id_Usuario_Creador`,`Fk_Id_Cliente`), ADD KEY `Fk_Id_Usuario_Creador_2` (`Fk_Id_Usuario_Creador`), ADD KEY `Fk_Id_Cliente` (`Fk_Id_Cliente`);

--
-- Indices de la tabla `ingreso_aplicacion`
--
ALTER TABLE `ingreso_aplicacion`
 ADD PRIMARY KEY (`IdIngresoAplicacion`), ADD KEY `Fk_Id_Usuario` (`Fk_Id_Usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
 ADD PRIMARY KEY (`IdProducto`), ADD KEY `Fk_Id_Categoria` (`Fk_Id_Categoria`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
 ADD PRIMARY KEY (`IdProveedor`);

--
-- Indices de la tabla `salidas`
--
ALTER TABLE `salidas`
 ADD PRIMARY KEY (`IdSalidas`), ADD KEY `Fk_Id_Usuario_Empleado` (`Fk_Id_Usuario_Empleado`);

--
-- Indices de la tabla `salida_devolucion`
--
ALTER TABLE `salida_devolucion`
 ADD PRIMARY KEY (`IdSalidaDevolucion`), ADD KEY `Fk_Id_Salida` (`Fk_Id_Salida`,`Fk_Id_Detalle_Proveedor_Producto`), ADD KEY `Fk_Id_Detalle_Proveedor_Producto` (`Fk_Id_Detalle_Proveedor_Producto`);

--
-- Indices de la tabla `salida_venta`
--
ALTER TABLE `salida_venta`
 ADD PRIMARY KEY (`IdSalidaVenta`), ADD KEY `Fk_Id_Salida` (`Fk_Id_Salida`,`Fk_Id_Factura_Salida_Venta`), ADD KEY `Fk_Id_Factura` (`Fk_Id_Factura_Salida_Venta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
 ADD PRIMARY KEY (`IdUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
MODIFY `IdCategoriaProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
MODIFY `IdUsuarioCliente` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `detalle_factura_producto`
--
ALTER TABLE `detalle_factura_producto`
MODIFY `IdDetalleFacturaProducto` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `detalle_producto_proveedor`
--
ALTER TABLE `detalle_producto_proveedor`
MODIFY `IdDetalleProveedor` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
MODIFY `IdUsuarioEmpleado` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `entradas`
--
ALTER TABLE `entradas`
MODIFY `IdEntrada` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `entrada_devolucion`
--
ALTER TABLE `entrada_devolucion`
MODIFY `IdEntradaDevolucion` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `entrada_pedido`
--
ALTER TABLE `entrada_pedido`
MODIFY `IdEntradaPedido` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
MODIFY `IdFactura` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `ingreso_aplicacion`
--
ALTER TABLE `ingreso_aplicacion`
MODIFY `IdIngresoAplicacion` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
MODIFY `IdProducto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
MODIFY `IdProveedor` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
MODIFY `IdSalidas` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `salida_devolucion`
--
ALTER TABLE `salida_devolucion`
MODIFY `IdSalidaDevolucion` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `salida_venta`
--
ALTER TABLE `salida_venta`
MODIFY `IdSalidaVenta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
ADD CONSTRAINT `Fk_Usuario_Cliente` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_factura_producto`
--
ALTER TABLE `detalle_factura_producto`
ADD CONSTRAINT `detalle_factura` FOREIGN KEY (`Fk_Id_Factura`) REFERENCES `factura` (`IdFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `detalle_fatura_producto` FOREIGN KEY (`Fk_Id_Producto`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_producto_proveedor`
--
ALTER TABLE `detalle_producto_proveedor`
ADD CONSTRAINT `Fk_detalle_producto` FOREIGN KEY (`Fk_Id_Producto`) REFERENCES `producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_detalle_proveedor` FOREIGN KEY (`Fk_Id_Proveedor`) REFERENCES `proveedor` (`IdProveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entradas`
--
ALTER TABLE `entradas`
ADD CONSTRAINT `Fk_Empleado` FOREIGN KEY (`Fk_Id_Usuario_Empleado`) REFERENCES `empleado` (`IdUsuarioEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entrada_devolucion`
--
ALTER TABLE `entrada_devolucion`
ADD CONSTRAINT `Fk_Detalle_Factura` FOREIGN KEY (`Fk_Id_Detalle_Factura`) REFERENCES `detalle_factura_producto` (`IdDetalleFacturaProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entrada_pedido`
--
ALTER TABLE `entrada_pedido`
ADD CONSTRAINT `Fk_Detalle_Proveedor_Producto` FOREIGN KEY (`Fk_Id_Detalle_Producto_Proveedor`) REFERENCES `detalle_producto_proveedor` (`IdDetalleProveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Entrada` FOREIGN KEY (`Fk_Id_Entrada`) REFERENCES `entradas` (`IdEntrada`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
ADD CONSTRAINT `Fk_Cliente` FOREIGN KEY (`Fk_Id_Cliente`) REFERENCES `cliente` (`IdUsuarioCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Empleado_Factura` FOREIGN KEY (`Fk_Id_Usuario_Creador`) REFERENCES `empleado` (`IdUsuarioEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingreso_aplicacion`
--
ALTER TABLE `ingreso_aplicacion`
ADD CONSTRAINT `Fk_Usuario` FOREIGN KEY (`Fk_Id_Usuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
ADD CONSTRAINT `Fk_Categoria_Producto` FOREIGN KEY (`Fk_Id_Categoria`) REFERENCES `categoria_producto` (`IdCategoriaProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `salidas`
--
ALTER TABLE `salidas`
ADD CONSTRAINT `Fk_Salida_Empleado` FOREIGN KEY (`Fk_Id_Usuario_Empleado`) REFERENCES `empleado` (`IdUsuarioEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `salida_devolucion`
--
ALTER TABLE `salida_devolucion`
ADD CONSTRAINT `Fk_Detalle_Producto_Proveedor` FOREIGN KEY (`Fk_Id_Detalle_Proveedor_Producto`) REFERENCES `detalle_producto_proveedor` (`IdDetalleProveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Salida` FOREIGN KEY (`Fk_Id_Salida`) REFERENCES `salidas` (`IdSalidas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `salida_venta`
--
ALTER TABLE `salida_venta`
ADD CONSTRAINT `Fk_Id_Factura_Venta` FOREIGN KEY (`Fk_Id_Factura_Salida_Venta`) REFERENCES `factura` (`IdFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `Fk_Salida_Venta` FOREIGN KEY (`Fk_Id_Salida`) REFERENCES `salidas` (`IdSalidas`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
