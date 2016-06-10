CREATE VIEW vw_productos AS
SELECT * FROM producto p INNER JOIN categoria_producto c ON p.Fk_Id_Categoria = c.IdCategoriaProducto
