<?php

class Categoria extends ModeloBaseDeDatos{
    public $TABLA='categoria_producto';
    public $valor_id_categoria;
    public $valor_nombre_categoria;
    public $valor_descripcion_categoria;
    public $valor_descripcion_estado_categoria;

    public function __construct() {
        
    }
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function crear_registro(){
        
        
        
        $this->sentencia_sql="SELECT fun_registrar_categoria_producto('$this->valor_nombre_categoria','$this->valor_descripcion_categoria') as respuesta";
        
        
        if($this->ejecutar_funcion_sql()){
            //$this->sentencia_sql="SELECT @respuesta";
            //$this->ejecutar_consulta_sql();
            
            if($this->respuesta_funcion->respuesta!=0){
                return array("codigo"=>"01","mensaje"=>  "Categoria registrada exitosamente","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
            }else{
                return array("codigo"=>"00","mensaje"=>  "Categoria ya existe","respuesta"=>FALSE,"nuevo_registro"=>"0");
            }
            
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }    
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_todas_las_categoria_producto()";
        
        
        if($this->ejecutar_consulta_sql()){
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->filas_json);
            
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
        
    }
    function obtener_registro_todos_los_registros_por_id(){
        
         //$this->sentencia_sql="CALL pa_consultar_categoria_producto_por_id('$this->valor_id_categoria') ";
          $this->sentencia_sql="SELECT * from categoria_producto WHERE IdCategoriaProducto='$this->valor_id_categoria'";
        
        
        if($this->ejecutar_consulta_sql()){
            
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->respuesta_funcion);
            
        }else{
            
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
        
    }
    
    function obtener_registro_todos_los_registros_por_nombre(){
        
         //$this->sentencia_sql="CALL pa_consultar_categoria_producto_por_id('$this->valor_id_categoria') ";
           $this->sentencia_sql="SELECT * from categoria_producto WHERE NombreCategoriaProducto LIKE '$this->valor_nombre_categoria%'";
        
        
        if($this->ejecutar_consulta_sql()){
            
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->filas_json);
            
        }else{
            
            return array("codigo"=>"01","mensaje"=>  $this->sentencia_sql,"respuesta"=>FALSE);
        }
        
    }
    function eliminar_registro(){
        $this->sentencia_sql="SELECT fun_actualizar_estado_categoria_producto('$this->valor_id_categoria')";
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Categoria eliminada","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function actualizar_recurso(){
        
         $this->sentencia_sql="SELECT fun_actualizar_categoria_producto('$this->valor_id_categoria','$this->valor_nombre_categoria','$this->valor_descripcion_categoria')";
        if($this->ejecutar_funcion_sql()){
                return array("codigo"=>"00","mensaje"=>  "Categoria actualizada con exito","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    
}
