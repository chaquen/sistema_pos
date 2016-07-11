<?php

class Salida extends ModeloBaseDeDatos{
    private $TABLA='salida';
    public $valor_id_salida;
    public $valor_codigo_salida; 
    public $valor_fecha_salida;
    public $valor_fk_id_usuario_empleado;
    public $valor_tipo_salida;


    public function __construct() {
        
    }
    
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."('$this->valor_codigo_salida', '$this->valor_fecha_salida', '$this->valor_fk_id_usuario_empleado','$this->valor_tipo_salida') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function crear_venta($id_factura){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."_venta('$this->valor_id_salida','$id_factura') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    } 
    function crear_salida_otros($fk_id_detalle_proveedor_producto, $cantida_devuelta, $comentario_devolucion,$idProducto){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."_otros('$this->valor_id_salida','$fk_id_detalle_proveedor_producto','$cantida_devuelta','$comentario_devolucion','$idProducto') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            //return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
            return TRUE;
        }else{
            //return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
            return FALSE;
        }
    } 
    function eliminar_salida(){
        $this->sentencia_sql="DELETE FROM ".$this->TABLA." WHERE IdSalidas='$this->valor_id_salida'";
        if($this->ejecutar_sentencia_sql()){
            return TRUE;
        }
        return FALSE;
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
    function obtener_registro_todos_los_registros_venta(){
        
        $this->sentencia_sql="CALL pa_consultar_".$this->TABLA."_venta()";       
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valoresConsultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
        
    }
    function obtener_registro_todos_los_registros_devolucion(){
        
        $this->sentencia_sql="CALL pa_consultar_".$this->TABLA."_devolucion()";       
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valoresConsultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
        
    }
    function obtener_registro_por_codigo(){
        
        $this->sentencia_sql="CALL pa_consultar_".$this->TABLA."_por_codigo('$this->valor_codigo_salida')";       
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
        
    }
    function eliminar_registro(){
        $this->sentencia_sql="";
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido eliminado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    function actualizar_recurso(){
        
        $this->sentencia_sql="";
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "El registro en la tabla $this->TABLA ha sido actualizado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
}
