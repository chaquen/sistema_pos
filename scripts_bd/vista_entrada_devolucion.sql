CREATE VIEW vw_vista_entrada_devolucion AS
SELECT * FROM entradas e INNER JOIN entrada_devolucion ed ON ed.Fk_id_Entrada=e.IdEntrada 
INNER JOIN detalle_factura_producto dfp ON ed.Fk_Id_Detalle_Factura= dfp.IdDetalleFacturaProducto
INNER JOIN producto p ON p.IdProducto=dfp.Fk_Id_Factura
