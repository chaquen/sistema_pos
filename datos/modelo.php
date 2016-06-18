<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../datos/constantes.php';
require_once '../utilidades/utilidades.php';

abstract class ModeloBaseDeDatos{

    public $sentencia_sql;
    public $filas=array();
    public $respuesta_funcion=array();
    public $filas_json;
    public $conexion;
    public $ultimoRegistro;
    public $filasAfectadas;
    public $codigoMensaje;
    public $mensajeDepuracion;

    private function abrir_conexion(){
        $this->conexion=new mysqli(DB_HOST, DB_USUARIO, DB_CLAVE, DB_NOMBRE_DATABASE, DB_PUERTO);
        if($this->conexion->connect_error){
                        
            $this->mensajeDepuracion=$this->conexion->error;
              $log=new Log();   
              $log->registrar_log_mysql("logs/error.log",$this->conexion->connect_errno, $this->conexion->connect_error);
           return FALSE;          
            
        }  else {
            return TRUE;
        }   

    }        
    private function cerrar_conexion(){
        $this->conexion->close();
    }
    public function ejecutar_funcion_sql(){
        if($this->sentencia_sql!=""){
            if($this->abrir_conexion()){
                if($resultado=$this->conexion->query($this->sentencia_sql)){
                    $this->respuesta_funcion=$resultado->fetch_object();
                    return TRUE;
                }else{
                    return FALSE;
                }            
            }else{

                $this->mensajeDepuracion=$this->conexion->error;
                $this->codigoMensaje =  $this->connect_errno;
                $log=new Log();   
                $log->registrar_log_php("logs/errorApp.log","1", $this->conexion->error);

                return FALSE;
            }
        }else{
            $this->mensajeDepuracion="por favor ingrese una sentencia SQL";
            return FALSE;
        }
        

    }
    
    public function ejecutar_consulta_sql(){
        
        if($this->abrir_conexion()){
            $arregloRespuesta=array();
            $this->conexion->set_charset('utf8');
            if($resultado=  $this->conexion->query($this->sentencia_sql)){
                //var_dump($resultado->fetch_object());
                //var_dump($resultado->fetch_assoc());
                //($resultado);
                //$this->respuesta_funcion=$resultado->fetch_object();
                
                //var_dump($resultado->fetch_assoc());
                
                while($arregloRespuesta[]=$resultado->fetch_assoc());
                //var_dump($arregloRespuesta);
                //$this->filasAfectadas=$this->field_count;
                
                $resultado->close();                    
                $this->cerrar_conexion();
                $i=0;
                
                foreach ($arregloRespuesta as  $value) {
                    //var_dump($value);
                    if($value!=null){
                        $this->filas[$i++]=  array_map('utf8_encode', $value);
                    }


                }
                
                //echo count($this->filas);
                
                if(count($this->filas)>0){
                    $this->filas_json=json_encode($this->filas);
                    //var_dump($this->filas_json);
                    return TRUE;
                }else{
                    $this->mensajeDepuracion="No existen registros con la especificacion que busca";
                    
                    return FALSE;
                }    

            }
        }
        else{
            
            $this->mensajeDepuracion=$this->conexion->error;
            $this->codigoMensaje =  $this->connect_errno;
            $log=new Log();   
            $log->registrar_log_php("logs/errorApp.log","1", $this->conexion->error);
              
            return FALSE;
        }

    }
    
    public function ejecutar_sentencia_sql(){
          if($this->abrir_conexion()){
              //echo $this->sentencia_sql;
              $this->conexion->set_charset('utf8');
              if($this->conexion->query($this->sentencia_sql)){
                  $this->ultimoRegistro=$this->conexion->insert_id;
                  $this->fiasAfectadas=$this->conexion->affected_rows;
                  //var_dump($this->conexion);
                  $this->cerrar_conexion();
                  return TRUE;
              }  else {
                    $this->mensajeDepuracion=$this->conexion->error;
                    $log=new Log();   
                    $log->registrar_log_php("logs/errorApp.log","1", $this->conexion->error);
                
                    $this->cerrar_conexion();
                  return FALSE;
              }
          }else{
              $this->mensajeDepuracion=$this->conexion->error;
              $log=new Log();   
              $log->registrar_log_php("logs/errorApp.log","1", $this->conexion->error);
                
                
                
              return FALSE;
          }  
    }
    //Metodos abstractoss
    public abstract function crear_registro();
    public abstract function obtener_registro_todos_los_registros();
    public abstract function eliminar_registro();
    public abstract function actualizar_recurso();


    /*
    public function insertar_registro(){
        if($this->sentencia_sql!=""){
            if($this->ejecutar_sentencia_sql()){
                $this->mensajeDepuracion="Registrado correctamente";
                $this->codigoMensaje="00";
                $r=TRUE;
            }else{
                $this->mensajeDepuracion=  $this->mensajeDepuracion;
                $this->codigoMensaje="01";
                $r=FALSE;
            }
            
            return $r;
        }else{
            $this->mensajeDepuracion="Sentencia vacia";
            $this->codigoMensaje="10";
            return FALSE;
            
        }
    }
    public function obtener_todos_los_registros(){
        if($this->sentencia_sql!=""){
            if($this->ejecutar_consulta_sql()){
                $this->mensajeDepuracion="Consulta realizada";
                $this->codigoMensaje="00";
                return TRUE;
            }else{
                $this->mensajeDepuracion= $this->mensajeDepuracion;
                $this->codigoMensaje="02";
                return FALSE;
            }
        }else{
            $this->mensajeDepuracion="Sentencia vacia";
            $this->codigoMensaje="10";
            return FALSE;
        }
    }
    public function obtener_registros(){
        if($this->sentencia_sql!=""){
            if($this->ejecutar_consulta_sql()){
                $this->mensajeDepuracion="Consulta realizada";
                $this->codigoMensaje="00";
                return TRUE;
            }else{
                $this->mensajeDepuracion= $this->mensajeDepuracion;
                $this->codigoMensaje="02";
                return FALSE;
            }
        }else{
            $this->mensajeDepuracion="Sentencia vacia";
            $this->codigoMensaje="10";
            return FALSE;
        }
    }
    public function editar_registro(){
        if($this->sentencia_sql!=""){
            if($this->ejecutar_sentencia_sql()){
                $this->mensajeDepuracion="Actualizacion realizada";
                $this->codigoMensaje="00";
                return TRUE;
            }else{
                $this->mensajeDepuracion= $this->mensajeDepuracion;
                $this->codigoMensaje="03";
                return FALSE;
            }
        }else{
            $this->mensajeDepuracion="Sentencia vacia";
            $this->codigoMensaje="10";
            return FALSE;
        }
    }
    public function eliminar_registro(){
        if($this->sentencia_sql!=""){
            if($this->ejecutar_sentencia_sql()){
                $this->mensajeDepuracion="Recurso eliminado";
                $this->codigoMensaje="00";
                return TRUE;
            }else{
                $this->mensajeDepuracion= $this->mensajeDepuracion;
                $this->codigoMensaje="04";
                return FALSE;
            }
        }else{
            $this->mensajeDepuracion="Sentencia vacia";
            $this->codigoMensaje="10";
            return FALSE;
        }
    }*/
}

