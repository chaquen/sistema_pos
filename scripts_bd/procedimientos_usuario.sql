-- Scripts de los procedimientos almacenados
--REGISTRO USUARIO empleado 
DELIMITER //
CREATE FUNCTION  fun_registrar_usuario_empleado (nombreUsuario VARCHAR(25),
                                        apellidoUsuario VARCHAR(25),
                                        documento VARCHAR(15),
                                        telefonoUsuario VARCHAR(15),
                                        celularUsuario VARCHAR(15),
                                        correoUsuario VARCHAR(55),    
                                        cargo VARCHAR(25),
                                        clave VARCHAR(256),
                                        pregunta_seguridad VARCHAR(55),
                                        respuesta_seguridad VARCHAR(55),
                                        ultima_actividad DATETIME)  
                                    RETURNS INT    

BEGIN
DECLARE id INT DEFAULT 0;
IF NOT EXISTS(SELECT * FROM usuario WHERE DocumentoUsuario=documento AND CorreoUsuario=correoUsuario) THEN 
        
 	INSERT INTO usuario (NombreUsuario, ApellidoUsuario, DocumentoUsuario, TelefonoUsuario, CelularUsuario, CorreoUsuario) 
 	VALUES (nombreUsuario,apellidoUsuario,documento,telefonoUsuario,celularUsuario,correoUsuario);
        
        SET id = LAST_INSERT_ID();
        
        INSERT INTO ingreso_aplicacion(Fk_Id_Usuario, Clave, PreguntaSeguridad, RespuestaSeguridad, UltimaActividad)
        VALUES(id,clave,pregunta_seguridad,respuesta_seguridad,ultima_actividad);
        
        INSERT INTO empleado(Fk_Id_Usuario,Cargo)
        VALUES(id,cargo);

   RETURN id;
ELSE
    RETURN 0;
END IF; 
END
//
DELIMITER;

--ACTUALIZAR USUARIO
DELIMITER //
CREATE FUNCTION  pa_actualizar_usuario (idUsuario INT,
                                        nombreUsuario VARCHAR(25),
                                        apellidoUsuario VARCHAR(25),
                                        documento VARCHAR(15),
                                        telefonoUsuario VARCHAR(15),
                                        celularUsuario VARCHAR(15),
                                        correoUsuario VARCHAR(55))
                                        RETURNS INT

BEGIN

IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=idUsuario) THEN 
 				UPDATE usuario 
                    SET  NombreUsuario=nombreUsuario,
                         ApellidoUsuario=apellidoUsuario,    
                         DocumentoUsuario=documento,
                         TelefonoUsuario=telefonoUsuario,
                         CelularUsuario=celularUsuario,
                         CorreoUsuario=correoUsuario  
                    WHERE IdUsuario=idUsuario;	
   RETURN 1;
ELSE
   RETURN 0;
END IF; 
END
//
DELIMITER;
--ELIMINAR USUARIO
    DELIMITER //
CREATE FUNCTION  fun_actualizar_estado_usuario (idUsuario INT)
RETURNS INT
BEGIN

IF EXISTS(SELECT * FROM usuario WHERE IdUsuario=idUsuario) THEN 
        IF((SELECT EstadoUsuario FROM usuario WHERE IdUsuario=idUsuario)=1) THEN 
            UPDATE usuario 
                    SET  EstadoUsuario = 0
                    WHERE IdUsuario=idUsuario ;	
        ELSE
            UPDATE usuario 
                    SET  EstadoUsuario = 1
                    WHERE IdUsuario=idUsuario ;	
        END IF;
    RETURN 1;
ELSE
    RETURN 0;
END IF; 
END
//
DELIMITER;

--CONSULTAR USUARIO
DELIMITER //
CREATE PROCEDURE  pa_consultar_todos_los_usuario ()
    
BEGIN
    SELECT * FROM usuario;
END
//
DELIMITER;

--REGISTRO USUARIO cliente 
DELIMITER //
CREATE FUNCTION  fun_registrar_usuario_cliente (nombreUsuario VARCHAR(25),
                                        apellidoUsuario VARCHAR(25),
                                        documento VARCHAR(15),
                                        telefonoUsuario VARCHAR(15),
                                        celularUsuario VARCHAR(15),
                                        correoUsuario VARCHAR(55),
                                        tarjeta VARCHAR(25))  
                                    RETURNS INT    

BEGIN
DECLARE id INT DEFAULT 0;
IF NOT EXISTS(SELECT * FROM usuario WHERE DocumentoUsuario=documento AND CorreoUsuario=correoUsuario) THEN 
        
 	INSERT INTO usuario (NombreUsuario, ApellidoUsuario, DocumentoUsuario, TelefonoUsuario, CelularUsuario, CorreoUsuario) 
 	VALUES (nombreUsuario,apellidoUsuario,documento,telefonoUsuario,celularUsuario,correoUsuario);
        
        SET id = LAST_INSERT_ID();
        
        
        INSERT INTO cliente(Fk_Id_Usuario,NumeroTarjeta)
        VALUES(id,tarjeta);

   RETURN id;
ELSE
    RETURN 0;
END IF; 
END
//
DELIMITER;