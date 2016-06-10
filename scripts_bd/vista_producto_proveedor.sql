CREATE VIEW vw_productos_proveedor AS
SELECT * FROM producto p INNER JOIN categoria_producto c ON p.Fk_Id_Categoria = c.IdCategoriaProducto 
	INNER JOIN detalle_producto_proveedor dpp  ON dpp.Fk_Id_Producto =p.IdProducto 
    INNER JOIN proveedor pr ON pr.IdProveedor=dpp.Fk_Id_Proveedor
