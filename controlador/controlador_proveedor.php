<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_my_clase_modelo.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Proveedor();//Mi clase modelo 
    
   
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
            $objeto->valor_nombre=trim($post->datos->nombre);
            $objeto->valor_nombre_contacto=trim($post->datos->nombre_contacto);
            $objeto->valor_telefono_contacto=trim($post->datos->telefono_contacto);
            $objeto->valor_correo_contacto=trim($post->datos->correo_contacto);            
            echo json_encode($objeto->crear_registro());
            
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
            $objeto->valor_id_proveedor=trim($post->datos->id_proveedor);
            $objeto->valor_nombre=trim($post->datos->nombre);
            $objeto->valor_nombre_contacto=trim($post->datos->nombre_contacto);
            $objeto->valor_telefono_contacto=trim($post->datos->telefono_contacto);
            $objeto->valor_correo_contacto=trim($post->datos->correo_contacto);  
            echo json_encode($objeto->actualizar_recurso());
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
            $objeto->valor_id_proveedor=trim($post->datos->id_proveedor);
            echo json_encode($objeto->eliminar_registro());
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth","codigo"=>"00"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion","codigo"=>"00"));
}