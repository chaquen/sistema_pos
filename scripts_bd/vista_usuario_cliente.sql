CREATE VIEW vw_usuario_cliente AS SELECT * FROM usuario u INNER JOIN cliente c ON u.IdUsuario=c.Fk_Id_Usuario

