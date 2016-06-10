CREATE VIEW vw_usuario_ingreso AS
SELECT * FROM usuario u INNER JOIN ingreso_aplicacion ia ON u.IdUsuario=ia.Fk_Id_Usuario
