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
        
        
       
         $this->sentencia_sql="SELECT fun_registrar_usuario"    
                ."('$this->valor_nombre',"
                . "'$this->valor_apellido',"
                . "'$this->valor_documento',"
                . "'$this->valor_telefono',"
                . "'$this->valor_celular',"
                . "'$this->valor_correo') as respuesta";
        
        
        if($this->ejecutar_funcion_sql()){
             
             $ut=$this->respuesta_funcion->respuesta;
             $this->sentencia_sql="SELECT fun_registro_empleado('$ut','$this->valor_cargo') as respuesta";
             
             if($this->ejecutar_funcion_sql()){
                 
                 $this->sentencia_sql="SELECT fun_registro_ingreso_aplicacion("
                                                            . "'$ut','$this->valor_clave',"
                                                            . "'$this->valor_pregunta',"
                                                            . "'$this->valor_respuesta',"
                                                            . "'$this->valor_ultima_actividad') as respuesta";
                 if($this->ejecutar_funcion_sql()){
                    return  array("codigo"=>"01","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$ut);
                 }else{
                    return array("codigo"=>"00","mensaje"=>  "Lo sentimos pero no hemos podido registrar el ingreso","respuesta"=>FALSE,"sentencia"=>  $this->sentencia_sql);
                 }
                     
             }else{
                return array("codigo"=>"00","mensaje"=>  "Lo sentimos pero no hemos podido crear el empleado","respuesta"=>FALSE,"sentencia"=>  $this->sentencia_sql);
             } 
             
             
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    
    function obtener_registro_todos_los_registros(){
      $this->sentencia_sql="SELECT * 
                FROM vw_usuario_empleado";        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla usuario","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
        
    }
       function obtener_registro_por_campo($valor){
      $this->sentencia_sql="SELECT * 
                FROM vw_usuario_empleado WHERE NombreUsuario LIKE  '$valor%' OR DocumentoUsuario LIKE '$valor'";        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla usuario","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
        
    }
    function eliminar_registro(){
        //$this->sentencia_sql="SELECT fun_actualizar_estado_".$this->TABLA."('$this->valor_id_producto')";
        $this->sentencia_sql="UPDATE usuario SET EstadoUsuario='0' WHERE IdUsuario ='$this->valor_id_usuario' ";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido eliminado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function activar_registro(){
        //$this->sentencia_sql="SELECT fun_actualizar_estado_".$this->TABLA."('$this->valor_id_producto')";
        $this->sentencia_sql="UPDATE usuario SET EstadoUsuario='1' WHERE IdUsuario='$this->valor_id_usuario' ";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido activado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function actualizar_recurso(){
        
        
        $this->sentencia_sql="UPDATE usuario 
                            SET  NombreUsuario='$this->valor_nombre',
                                 ApellidoUsuario='$this->valor_apellido',    
                                 DocumentoUsuario='$this->valor_documento',
                                 TelefonoUsuario='$this->valor_telefono',
                                 CelularUsuario='$this->valor_celular',
                                 CorreoUsuario='$this->valor_correo'  
                            WHERE IdUsuario='$this->valor_id_usuario'";
        
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "El registro en la tabla $this->TABLA ha sido actualizado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function cambiar_clave(){
        $this->sentencia_sql="SELECT fun_cambiar_clave('$this->valor_id_usuario','$this->valor_clave') as respuesta";
        if($this->ejecutar_funcion_sql()){
            return array("respuesta"=>TRUE,"mensaje"=>"clave cambiada con exito");
        }else{
            return array("respuesta"=>FALSE,"mensaje"=>  $this->mensajeDepuracion);
        }
    }
    function logIn(){
        $this->sentencia_sql="SELECT * FROM vw_usuario_ingreso 
                WHERE (CorreoUsuario='$this->valor_correo') 
                AND (Clave = '$this->valor_clave')";
        if($this->ejecutar_consulta_sql()){
            return array("respuesta"=>TRUE,"mensaje"=>"Bienvenido","valores_consultados"=>  $this->filas_json);
        }else{
            return array("respuesta"=>FALSE,"mensaje"=>  $this->mensajeDepuracion);
        }
    }
    function logOut(){
        $this->sentencia_sql="UPDATE ingreso_aplicacion "
                . "SET UltimaActividad ='$this->valor_ultima_actividad' WHERE Fk_Id_Usuario='$this->valor_id_usuario'";
        if($this->ejecutar_sentencia_sql()){
            return array("respuesta"=>TRUE,"mensaje"=>"Hasta pronto");
        }else{
            return array("respuesta"=>FALSE,"mensaje"=>  $this->mensajeDepuracion);
        }
    }

}
