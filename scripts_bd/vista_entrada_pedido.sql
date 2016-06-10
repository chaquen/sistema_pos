CREATE VIEW vw_vista_entrada_pedido AS
SELECT * FROM entradas e INNER JOIN entrada_pedido ep ON e.IdEntrada=ep.Fk_Id_Entrada
INNER JOIN detalle_producto_proveedor dpp ON ep.Fk_Id_Detalle_Producto_Proveedor=dpp.IdDetalleProveedor 
INNER JOIN producto p ON p.IdProducto=dpp.Fk_Id_Producto 
INNER JOIN proveedor pr ON dpp.Fk_Id_Proveedor=pr.IdProveedor
