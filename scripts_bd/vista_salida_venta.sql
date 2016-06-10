CREATE VIEW vw_salida_ventas AS 
SELECT * FROM factura f 
INNER JOIN detalle_factura_producto dfp ON f.IdFactura=dfp.Fk_Id_Factura
INNER JOIN producto p ON dfp.Fk_Id_Producto=p.IdProducto 
INNER JOIN salida_venta sv ON sv.Fk_Id_Factura_Salida_Venta=f.IdFactura
INNER JOIN salidas s ON s.IdSalidas=sv.Fk_Id_Salida
