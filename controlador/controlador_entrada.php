<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Entrada();//Mi clase modelo 
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
            //var_dump($post);
            $objeto->valor_codigo_entrada=trim($post->datos->codigo_entrada);
            $objeto->valor_fecha_entrada=trim($post->hora_cliente);
            $objeto->valor_fk_id_usuario_empleado=trim($post->datos->id_empleado);
            $objeto->valor_tipo_entrada='Pedido';  
            $r=$objeto->crear_registro();
            $id=$r["nuevo_registro"];
            $objeto->valor_id_entrada=$id;
            if($r["respuesta"]){
                /*REGISTRO DEL DETALLE*/
                /**
                 * AQUI REGISTRAR EL DETALLE DEL PRODUCTO PROVEEDOR
                 */
                $i=0;
                $res=array("mensaje"=>"Pedido registrado","respuesta"=>true);
                $valido=FALSE;
                foreach ($post->datos->lista_pedido as $key => $value) {
                            
                    
                   $idProducto= $value->IdProducto;
                   //var_dump($value);
                   $p=new Producto();
                    $y=$p->asociar_producto_proveedor($value->IdProducto, $post->datos->id_proveedor,$value->cantidad_entrada);
                    
                   
                    if($y["respuesta"]){
                         //fun_registrar_entrada_pedido('','14', '0', '123')   
                        /*echo "ID ENTRADA=>".$id."<br>";
                        echo "NUEVO REGISTRO=>".$y["nuevo_registro"]."<br>";
                        echo "CANTIDDA ENTRADA=>".$value->cantidad_entrada."<br>";
                        echo "PRECIO ENTRADA=>".$value->precio_entrada."<br>";
                        echo "ID PRODUCTO".$idProducto."<br>";*/
                        if($objeto->crear_pedido($id,$y["nuevo_registro"], $value->cantidad_entrada, $value->precio_entrada,$idProducto)){
                    
                            $res["items"][$i]=array("respuesta"=>TRUE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                            $i++;
                            $valido=TRUE;
                        }else{
                    
                            $res["items"][$i]=array("respuesta"=>FALSE,"mensaje"=>$objeto->mensajeDepuracion,"codigo"=>"01");
                            $i++;
                            $valido=FALSE;
                            //No se ha registrao detalle pedido
                        }
                                           
                        
                        
                    }else{
                        echo $p->sentencia_sql;
                        $objeto->eliminar_entrada();
                        $valido=FALSE;
                    }
                
                    
                    
                }
                    if($valido){
                            echo json_encode(array("respusta"=>TRUE,
                                "mensaje"=>"Entrada registrada satisfactoriamente",
                                "valores_respuestas"=>$res));
                    }else{
                            $objeto->eliminar_entrada();
                            
                            echo json_encode(array("respuesta"=>FALSE,
                                "mensaje"=>"Lo sentimos pero no hemos podido crear la asociacion de este producto con el proveedor por favor comunicate con tu administrador",
                                "valores_respuestas"=>$res));
                    }
                //echo json_encode($res);
            }
            else{
            
                echo json_encode($r);
            }
            
            
            break;
        case "crearotros":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            $objeto->valor_codigo_entrada=trim($post->datos->codigo_entrada);
            $objeto->valor_fecha_entrada=trim($post->hora_cliente);
            $objeto->valor_fk_id_usuario_empleado=trim($post->datos->id_empleado);
            $objeto->valor_tipo_entrada=$post->datos->tipo_devolucion;
            $r=$objeto->crear_registro();
            $objeto->valor_id_entrada=$r["nuevo_registro"];
            if($r["respuesta"]){
                /*REGISTRO DEL DETALLE*/
                $i=0;
                $res=array();
                $valido=FALSE;
                foreach ($post->datos->lista_pedido as $key => $value) {
                    /*echo "Cantidad entrada ".$value->cantidad_entrada."<br>";
                    echo "Comentario ".$value->comentario."<br>";
                    echo "tipoDevolucion ".$post->datos->tipo_devolucion."<br>";*/
                    if($objeto->crear_devolucion($value->cantidad_entrada,  $value->comentario)){
                        $res[$i]=array("respuesta"=>TRUE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                        $i++;
                        $valido=TRUE;
                    }else{
                        $res[$i]=array("respuesta"=>FALSE,"mensaje"=>"Error al registrar el detalle","codigo"=>"01");
                        $i++;
                        $valido=FALSE;
                        //No se ha registrao detalle pedido
                    }
                }
                
                if($valido){
                    echo json_encode(array("respusta"=>TRUE,"mensaje"=>"Entrada registrada satisfactoriamente","valores_respuestas"=>$res));
                }else{
                    $objeto->eliminar_entrada();
                    echo json_encode(array("respusta"=>FALSE,"mensaje"=>"No hemos podido registrar la entrada por favor comunicate con tu administrador","valores_respuestas"=>$res));
                }
                
            }else{
                echo json_encode($r);
            }
            
            break;
        case "crear":
            /*
             * AQUI DOY VALOR A CADA UNA DE LAS PROPIEDADES DE LA CLASE PARA INSERTAR LOS VALORES
             */
            /*
             * Para acceder a cada una de las propiedaes enviadas en el metodo POST se debe acceder desde objeto 
             * $post a la proiedad datos ejemplo
             * $post->datos->miDatoEnviadoDesdeElCliente
             */
            //var_dump($post);
            $objeto->valor_codigo_entrada=trim($post->datos->codigo_entrada);
            $objeto->valor_fecha_entrada=trim($post->datos->hora_cliente);
            $objeto->valor_fk_id_usuario_empleado=trim($post->datos->id_empleado);
            $r=$objeto->crear_registro();
            $objeto->valor_id_entrada=$r["nuevo_registro"];
            
            if($r["respuesta"]){
                /*REGISTRO DEL DETALLE*/
                /**
                 * AQUI REGISTRAR EL DETALLE DEL PRODUCTO PROVEEDOR
                 */
                $i=0;
                $res=array();
                foreach ($post->datos->lista_pedido as $key => $value) {
                            
                    
                    
                    
                    $y=$objeto->asociar_producto_proveedor($value->IdProducto, $post->datos->id_proveedor);
                    if($y["respuesta"]){
                        
                        if($objeto->crear_pedido($y["nuevo_registro"], $value->cantidad_entrada, $value->precio_proveedorEntrada)){
                            $res[$i]=array("respuesta"=>TRUE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                            $i++;
                        }else{
                            $res[$i]=array("respuesta"=>FALSE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                            $i++;
                            //No se ha registrao detalle pedido
                        }
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
        case "consultarCodigo":
            echo json_encode($objeto->consultar_codigo_entrada());
            break;
 
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth","codigo"=>"00"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion","codigo"=>"00"));
}