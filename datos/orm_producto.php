<?php
require 'datos/modelo.php';
class Producto extends ModeloBaseDeDatos{
    private $TABLA='producto';
    public $valor_id_producto;
    public $valor_codigo_producto;
    public $valor_nombre_producto;
    public $valor_descripcion_producto;
    public $valor_fk_id_categoria;
    public $valor_precio_venta;
    public $valor_existencias_total_bodega;
    public $valor_existencias_total_tienda;
    
            




    public function __construct() {
        
    }
    
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."('$this->valor_codigo_producto','$this->valor_nombre_producto','$this->valor_descripcion_producto','$this->valor_fk_id_categoria') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }    
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function obtener_registro_todos_los_registros(){
        $this->sentencia_sql="CALL pa_consultar_".$this->TABLA."()";        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valoresConsultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
        
    }
    function eliminar_registro(){
        $this->sentencia_sql="SELECT fun_actualizar_estado_".$this->TABLA."('$this->valor_id_producto')";
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido eliminado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="SELECT fun_actualizar_".$this->TABLA."('$this->valor_id_producto','$this->valor_codigo_producto','$this->valor_nombre_producto','$this->valor_descripcion_producto','$this->valor_fk_id_categoria')";
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "El registro en la tabla $this->TABLA ha sido actualizado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}