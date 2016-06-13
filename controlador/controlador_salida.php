<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_my_clase_modelo.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Salida();//Mi clase  modelo 
   
    switch($operacion){
        case "crearventa":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_codigo_salida=trim($post->datos->codigo_salida);
            $objeto->valor_fecha_salida=trim($post->datos->hora_cliente);
            $objeto->valor_fk_id_usuario_empleado=trim($post->datos->id_empleado);            
            $r=$objeto->crear_registro();
            $objeto->valor_id_salida=$r["nuevo_registro"];
            if($r["respuesta"]){
                echo json_encode($objeto->crear_venta($post->datos->id_factura));
            }else{
                echo json_encode($r);
            }
            
            
            break;
        case "creardevolucion":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_codigo_salida=trim($post->datos->codigo_salida);
            $objeto->valor_fecha_salida=trim($post->datos->hora_cliente);
            $objeto->valor_fk_id_usuario_empleado=trim($post->datos->id_empleado);            
            $r=$objeto->crear_registro();
            $objeto->valor_id_salida=$r["nuevo_registro"];
            if($r["respuesta"]){
                $i=0;
                $res=array();
                foreach ($post->datos->lista_devolucion as $key => $value) {
                    if($objeto->crear_devolucion($value->fk_id_detalle_proveedor_producto, $value->cantida_devuelta, $value->comentario_devolucion)){
                        $res[$i]=array("respuesta"=>TRUE,"mensaje"=>"Devolucion registrada con exito");
                        $i++;
                    }else{
                        $res[$i]=array("respuesta"=>FALSE,"mensaje"=>"Devolucion registrada con exito");
                    }
                }
                echo json_encode($res);
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
            
            //echo json_encode($objeto->actualizar_recurso());
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Lo sentimos pero no tienes permisos para actualzar esta salida"));
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
            //echo json_encode($objeto->eliminar_registro());
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Lo sentimos pero no tienes permisos para eliminar esta salida"));
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