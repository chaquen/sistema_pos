CREATE VIEW vw_productos AS select `p`.`IdProducto` AS `IdProducto`,`p`.`CodigoProducto` AS `CodigoProducto`,`p`.`NombreProducto` AS `NombreProducto`,`p`.`DescripcionProducto` AS `DescripcionProducto`,`p`.`Fk_Id_Categoria` AS `Fk_Id_Categoria`,`p`.`PrecioVentaDefinitivo` AS `PrecioVentaDefinitivo`,`p`.`EstadoProducto` AS `EstadoProducto`,`p`.`ExistenciasTotalBodega` AS `ExistenciasTotalBodega`,`p`.`ExistenciasTotalTienda` AS `ExistenciasTotalTienda`,`p`.`ExistenciasMinimas` AS `ExistenciasMinimas`,`c`.`IdCategoriaProducto` AS `IdCategoriaProducto`,`c`.`NombreCategoriaProducto` AS `NombreCategoriaProducto`,`c`.`DescripcionCategoriaProducto` AS `DescripcionCategoriaProducto`,`c`.`EstadoCategoriaProducto` AS `EstadoCategoriaProducto` from (`producto` `p` join `categoria_producto` `c` on((`p`.`Fk_Id_Categoria` = `c`.`IdCategoriaProducto`)))