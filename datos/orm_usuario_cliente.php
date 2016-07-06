<?php

class UsuarioCliente extends ModeloBaseDeDatos{
    public $TABLA='cliente';
    public $valor_id_usuario;
    public $valor_nombre;
    public $valor_apellido;
    public $valor_documento;
    public $valor_telefono;
    public $valor_celular;
    public $valor_correo;
    public $valor_tarjeta;


    public function __construct() {
        
    }
    
    
    function crear_registro(){
        
        
        
        $this->sentencia_sql="SELECT fun_registrar_usuario('$this->valor_nombre','$this->valor_apellido','$this->valor_documento','$this->valor_telefono','$this->valor_celular','$this->valor_correo') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            if($this->respuesta_funcion->respuesta=="0"){
                return array("codigo"=>"01","mensaje"=>  "Opps parece que no te hemos podido registrar en nuestra base de datos","respuesta"=>FALSE,"nuevo_registro"=>$this->respuesta_funcion->respuesta,"sentencia"=>  $this->sentencia_sql);
            }else{
                return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
            }
            
        }else{
            return array("codigo"=>"001","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE,"sentencia"=>  $this->sentencia_sql);
        }
    }   
    function crear_usuario_cliente(){
        $this->sentencia_sql="SELECT fun_registrar_usuario_cliente('$this->valor_id_usuario','$this->valor_tarjeta') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            if($this->respuesta_funcion->respuesta=="0"){
                return array("codigo"=>"01","mensaje"=>  "Opps parece que no te hemos podido registrar en nuestra base de datos","respuesta"=>FALSE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
            }else{
                return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
            }
            
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE,"sentencia"=>  $this->sentencia_sql);
        }
    }
    function obtener_registro_todos_los_registros(){
      $this->sentencia_sql="CALL pa_consultar_todos_los_usuario()";        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla usuario","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valoresConsultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
        
    }
    function obtener_registros_por_cedula(){
        $this->sentencia_sql="CALL pa_consultar_usuario_cliente_por_cedula('$this->valor_documento')";        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla usuario","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valoresConsultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }   
    }
    function eliminar_registro(){
        //$this->sentencia_sql="SELECT fun_actualizar_estado_".$this->TABLA."('$this->valor_id_producto')";
        $this->sentencia_sql="UPDATE ".$this->TABLA." SET EstadoUsuario='0' WHERE IdUsuario ='$this->valor_id_usuario' ";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido eliminado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function activar_registro(){
        //$this->sentencia_sql="SELECT fun_actualizar_estado_".$this->TABLA."('$this->valor_id_producto')";
        $this->sentencia_sql="UPDATE ".$this->TABLA." SET EstadoUsuario='1' WHERE IdUsuario='$this->valor_id_usuario' ";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido activado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_usuario('$this->valor_id_usuario',$this->valor_nombre','$this->valor_apellido','$this->valor_documento','$this->valor_telefono','$this->valor_celular')";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "El registro en la tabla $this->TABLA ha sido actualizado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
