CREATE VIEW vw_facturas AS 
SELECT * FROM factura f INNER JOIN detalle_factura_producto dfp ON f.IdFactura=dfp.Fk_Id_Factura
INNER JOIN producto p ON dfp.Fk_Id_Producto=p.IdProducto
