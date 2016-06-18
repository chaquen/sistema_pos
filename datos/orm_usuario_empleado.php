<?php

class UsuarioEmpleado extends ModeloBaseDeDatos{
    private $TABLA='empleado';
    public $valor_id_usuario;
    public $valor_nombre;
    public $valor_apellido;
    public $valor_documento;
    public $valor_telefono;
    public $valor_celular;
    public $valor_correo;
    public $valor_cargo;
    public $valor_clave;
    public $valor_pregunta;
    public $valor_respuesta;
    public $valor_ultima_actividad;

    public function __construct() {
        
    }

     function crear_registro(){
        
        
        
        $this->sentencia_sql="SELECT fun_registrar_usuario_".$this->TABLA."('$this->valor_nombre','$this->valor_apellido','$this->valor_documento','$this->valor_telefono','$this->valor_celular','$this->valor_correo','$this->valor_cargo','$this->valor_clave','$this->valor_pregunta','$this->valor_respuesta','$this->valor_ultima_actividad') as respuesta";
        
        
        if($this->insertar_registro()){
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
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
    function eliminar_registro(){
        $this->sentencia_sql="SELECT fun_actualizar_estado_usuario('$this->valor_id_usuario')";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido eliminado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_usuario('$this->valor_id_usuario',$this->valor_nombre','$this->valor_apellido','$this->valor_documento','$this->valor_telefono','$this->valor_celular','$this->valor_correo')";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "El registro en la tabla $this->TABLA ha sido actualizado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }

}
