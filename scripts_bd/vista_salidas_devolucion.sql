CREATE VIEW vw_salidas_devolucion AS 
        SELECT * FROM salidas s INNER JOIN salida_devolucion sd 
                                                ON s.IdSalidas=sd.Fk_Id_Salida 
                                INNER JOIN detalle_producto_proveedor dpp   
                                                ON sd.Fk_Id_Detalle_Proveedor_Producto 
                                INNER JOIN producto p 
                                                ON dpp.Fk_id_producto=p.IdProducto 
                                INNER JOIN proveedor pr 
                                                ON dpp.Fk_Id_Proveedor=pr.IdProveedor
