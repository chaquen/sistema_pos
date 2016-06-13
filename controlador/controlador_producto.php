<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_categoria.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Producto();//Mi clase modelo 
    
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
            
            $objeto->valor_nombre_producto=trim($post->datos->nombre_producto);
            $objeto->valor_codigo_producto=trim($post->datos->codigo_producto);
            $objeto->valor_descripcion_producto=trim($post->datos->descripcion_producto);
            $objeto->valor_fk_id_categoria=trim($post->datos->id_categoria);
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
            $objeto->valor_id_producto=trim($post->datos->id_producto);
            $objeto->valor_nombre_producto=trim($post->datos->nombre_producto);
            $objeto->valor_codigo_producto=trim($post->datos->codigo_producto);
            $objeto->valor_descripcion_producto=trim($post->datos->descripcion_producto);
            $objeto->valor_fk_id_categoria=trim($post->datos->id_categoria);
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
            $objeto->valor_id_producto=trim($post->datos->id_producto);
            echo json_encode($objeto->eliminar_registro());
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "asociar":
            echo json_encode($objeto->asociar_producto_proveedor($post->datos->id_producto, $post->datos->id_proveedor));
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth","codigo"=>"00"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion","codigo"=>"00"));
}