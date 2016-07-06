<?php
header('Content-Type:text/html; Charset="UTF-8"');    
include("../datos/orm_core.php");
if(isset($_POST['datos'])){
    $post=  json_decode($_POST['datos']);
    $operacion=$post->operacion;
    $objeto= new Factura();//Mi clase modelo 
   
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
            $objeto->valor_codigo_factura=trim($post->datos->codigo_factura);
            $objeto->valor_fecha_factura=trim($post->hora_cliente);
            $objeto->valor_estado_factura=trim($post->datos->estado_factura);
            $objeto->valor_id_empleado=trim($post->datos->id_empleado);
            //Variable que indica si el usuario es nuevo debe ser tru para registrar el usuario
            if($post->datos->nuevo_cliente==TRUE){
                /*AQUI INGRESO UN NUEVO CLIENTE*/
                $cli=new UsuarioCliente();
                $cli->valor_nombre=trim($post->datos->nombre_cliente);
                /*$cli->valor_apellido=trim($post->datos->apellido_cliente);
                $cli->valor_documento=trim($post->datos->docuemnto_cliente);
                $cli->valor_correo=trim($post->datos->correo_cliente);
                $cli->valor_celular=trim($post->datos->celular_cliente);
                $cli->valor_telefono=trim($post->datos->telefono_cliente);*/
                $cli->valor_apellido=trim("N/A");
                $cli->valor_documento=trim($post->datos->documento_cliente);
                $cli->valor_correo=trim("N/A");
                $cli->valor_celular=trim("N/A");
                $cli->valor_telefono=trim("N/A");
                    if($post->datos->tarjeta==false){
                       $cli->valor_tarjeta=trim("N/A"); 
                    }else{
                        $cli->valor_tarjeta=trim($post->datos->tarjeta); 

                    }
                $r=$cli->crear_registro();
                if($r["respuesta"]){
                  
                  $cli->valor_id_usuario=trim($r["nuevo_registro"]);
                  $rr=$cli->crear_usuario_cliente();
                  if($rr["respuesta"]==FALSE){
                      echo json_encode($rr);
                  }else{
                    
                      $objeto->valor_id_cliente= trim($rr["nuevo_registro"]);
                      
                  }
                  
                  
                }else{
                    echo json_encode($r);
                }
            } 
            else {
                $objeto->valor_id_cliente= trim($post->datos->documento_cliente);
            }
            
            
            $respuesta=$objeto->crear_registro();
            $objeto->valor_id_factura=$respuesta["nuevo_registro"];
            
            if($respuesta["respuesta"]){
                $i=0;
                $res=array();
                $valido=FALSE;
                foreach ($post->datos->lista_factura as $key => $valor) {
            
                    if($objeto->crear_detalle_factura($valor->IdProducto, $valor->total, $valor->cantidad_vendida)){
                        $res[$i]=array("respuesta"=>TRUE,"mensaje"=>"detalle registrado exitosamenete","codigo"=>"00");
                        $i++;
                        $valido=TRUE;
                      
                    }else{
                        $res[$i]=array("respuesta"=>FALSE,"mensaje"=>"Error al crear el detalle de la factura","codigo"=>"01","s"=>$objeto->sentencia_sql);
                        $i++;
                        $valido=FALSE;
                    }
                }
                if($valido){
                    echo json_encode(array("respuesta"=>TRUE,"mensaje"=>"Factura registrada satisfactoriamente","valores_insertados"=>$res));
                }else{
                    
                    $objeto->eliminar_factura();
                    
                    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Error al crear factura","valores_insertados"=>$res));
                }
                
            }else{
                
                echo json_encode($respuesta);
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
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Lo sentimos pero no tienes permisos para actualzar esta factura"));
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
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Lo sentimos pero no tienes permisos para actualzar esta factura"));
            
            break;
        case "consultar":
            echo json_encode($objeto->obtener_registro_todos_los_registros());
            break;
        case "consultarCodigo":
            echo json_encode($objeto->consultar_codigo_factura());
            break;
        default :
            echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor defina una operacion o agrege una opcion en el swicth","codigo"=>"00"));
            break;
    }
}else{
    echo json_encode(array("respuesta"=>FALSE,"mensaje"=>"Por favor ingrese datos en la peticion","codigo"=>"00"));
}