<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new UsuarioEmpleado();//Mi clase  modelo 
   
    switch($operacion){
        case "crear":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_nombre=trim($post->datos->nombre_usuario);
            $objeto->valor_apellido=trim($post->datos->apellido_usuario);
            $objeto->valor_documento=trim($post->datos->documento_usuario);
            $objeto->valor_telefono=trim($post->datos->telefono_usuario);
            $objeto->valor_celular=trim($post->datos->celular_usuario);
            $objeto->valor_correo=trim($post->datos->correo_usuario);
            $objeto->valor_cargo=trim($post->datos->cargo_usuario);
            $objeto->valor_clave=trim($post->datos->clave);
            $objeto->valor_pregunta=trim($post->datos->pregunta);
            $objeto->valor_respuesta=trim($post->datos->respuesta);
            $objeto->valor_ultima_actividad=trim($post->hora_cliente);
                     
            $r=$objeto->crear_registro();
            if($r["respuesta"]){
                echo json_encode($r);
                
            }else{
                echo json_encode($r);
            }
            
            
            break;
        case "actualizar":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA ACTUALIZAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_id_usuario=trim($post->datos->id_usuario);
            $objeto->valor_nombre=trim($post->datos->nombre_usuario);
            $objeto->valor_apellido=trim($post->datos->apellido_usuario);
            $objeto->valor_documento=trim($post->datos->documento_usuario);
            $objeto->valor_telefono=trim('null');
            $objeto->valor_celular=trim('null');
            $objeto->valor_correo=trim($post->datos->correo_usuario);
            $objeto->valor_clave=trim($post->datos->clave);
            $r=$objeto->actualizar_recurso();
            if($r["respuesta"]){
                
                $objeto->cambiar_clave();
                echo json_encode($r);
            }else{
                echo json_encode($r);
            }
            
            break;
        case "eliminar":
            
            /*
             * AQUI DOY VALOR DEL ISD QUE DESEO ELIMINAR
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_id_usuario=trim($post->datos->id_usuario);
            echo json_encode($objeto->eliminar_registro());
            break;
        case "habilitar":
            
            /*
             * AQUI DOY VALOR DEL ISD QUE DESEO ELIMINAR
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_id_usuario=trim($post->datos->id_usuario);
            echo json_encode($objeto->activar_registro());
            break;
        case "consultar":
            if($post->datos->nombre_usuario==""){
                echo json_encode($objeto->obtener_registro_todos_los_registros());
            }else{
                echo json_encode($objeto->obtener_registro_por_campo($post->datos->nombre_usuario));
            }
            
            break;
        case "ingreso":
            /*
             * AQUI VALIDAR INGRESO USUARIO
             */
            $objeto->valor_correo=trim($post->datos->user_name);
            $objeto->valor_clave=trim($post->datos->clave);
            echo json_encode($objeto->logIn());
            
            break;
        case "cerrarSesion":
            $objeto->valor_id_usuario=trim($post->datos->id_user);
            $objeto->valor_ultima_actividad=trim($post->hora_cliente);
            echo json_encode($objeto->logOut());
            break;
        case "consultarRol":
            json_encode($objeto->consultar_menu_rol($post->datos->id_rol));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth","codigo"=>"00"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion","codigo"=>"00"));
}