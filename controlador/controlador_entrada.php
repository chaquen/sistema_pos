<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_my_clase_modelo.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Entrada();//Mi clase  modelo 
   
    switch($operacion){
        case "crearpedido":
            
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_codigo_entrada=trim($post->datos->codigo_entrada);
            $objeto->valor_fecha_entrada=trim($post->datos->hora_cliente);
            $objeto->valor_fk_id_usuario_empleado=trim($post->datos->id_empleado);
            $r=$objeto->crear_registro();
            $objeto->valor_id_entrada=$r["nuevo_registro"];
            if($r["respuesta"]){
                /*REGISTRO DEL DETALLE*/
                $i=0;
                $res=array();
                foreach ($post->datos->lista_pedido as $key => $value) {
                    if($objeto->crear_pedido($value->fk_id_detalle_producto_proveedor, $value->cantidad_entrada, $value->precio_proveedorEntrada)){
                        $res[$i]=array("respuesta"=>TRUE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                        $i++;
                    }else{
                        $res[$i]=array("respuesta"=>FALSE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                        $i++;
                        //No se ha registrao detalle pedido
                    }
                }
                echo json_encode($res);
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
            $objeto->valor_codigo_entrada=trim($post->datos->codigo_entrada);
            $objeto->valor_fecha_entrada=trim($post->datos->hora_cliente);
            $objeto->valor_fk_id_usuario_empleado=trim($post->datos->id_empleado);
            $r=$objeto->crear_registro();
            $objeto->valor_id_entrada=$r["nuevo_registro"];
            if($r["respuesta"]){
                /*REGISTRO DEL DETALLE*/
                $i=0;
                $res=array();
                foreach ($post->datos->lista_pedido as $key => $value) {
                    if($objeto->crear_devolucion($value->fk_id_detalle_factura, $value->cantidad_devolucion, $value->estado_devolucion, $value->cometario_devolucion)){
                        $res[$i]=array("respuesta"=>TRUE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                        $i++;
                    }else{
                        $res[$i]=array("respuesta"=>FALSE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                        $i++;
                        //No se ha registrao detalle pedido
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
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Lo sentimos pero no tienes permisos para actualzar esta entrada"));
            //echo json_encode($objeto->actualizar_recurso());
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
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Lo sentimos pero no tienes permisos para actualzar esta entrada"));
            //echo json_encode($objeto->eliminar_registro());
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