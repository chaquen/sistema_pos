CREATE VIEW vw_usuario_empleado AS 
SELECT * FROM usuario u 
    INNER JOIN empleado e 
    ON u.IdUsuario=e.Fk_Id_Usuario

