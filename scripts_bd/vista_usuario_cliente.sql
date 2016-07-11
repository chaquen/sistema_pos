CREATE VIEW vw_usuario_cliente AS  select `u`.`IdUsuario` AS `IdUsuario`,`u`.`NombreUsuario` AS `NombreUsuario`,`u`.`ApellidoUsuario` AS `ApellidoUsuario`,`u`.`DocumentoUsuario` AS `DocumentoUsuario`,`u`.`TelefonoUsuario` AS `TelefonoUsuario`,`u`.`CelularUsuario` AS `CelularUsuario`,`u`.`CorreoUsuario` AS `CorreoUsuario`,`u`.`EstadoUsuario` AS `EstadoUsuario`,`c`.`IdUsuarioCliente` AS `IdUsuarioCliente`,`c`.`Fk_Id_Usuario` AS `Fk_Id_Usuario`,`c`.`NumeroTarjeta` AS `NumeroTarjeta` from (`usuario` `u` join `cliente` `c` on((`u`.`IdUsuario` = `c`.`Fk_Id_Usuario`)))