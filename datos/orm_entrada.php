<?php

class Entrada extends ModeloBaseDeDatos{
    private $TABLA='entrada';
    public $valor_id_entrada;
    public $valor_codigo_entrada;
    public $valor_fecha_entrada;
    public $valor_fk_id_usuario_empleado;
    public $valor_tipo_entrada;
    public function __construct() {
        
    }
    
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."('$this->valor_codigo_entrada','$this->valor_fecha_entrada', '$this->valor_fk_id_usuario_empleado','$this->valor_tipo_entrada') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE,"sentencia"=>  $this->sentencia_sql);
        }
    }  
    function crear_pedido($id,$fk_id_detalle_producto_proveedor, $cantidad_entrada, $precio_proveedorEntrada,$id_producto){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."_pedido('$id',"
                . "                                                       '$fk_id_detalle_producto_proveedor', "
                . "                                                        '$cantidad_entrada', "
                . "                                                         '$precio_proveedorEntrada',"
                . "                                                         '$id_producto') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            //return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
            return TRUE;
        }else{
            //return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
            return FALSE;
        }
    }
    function crear_devolucion($cantidad_devolucion,  $cometario_devolucion){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."_otros('$cantidad_devolucion','$cometario_devolucion','$this->valor_id_entrada') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
    }
    
    function obtener_registro_todos_los_registros(){
        
        $this->sentencia_sql="CALL pa_consultar_".$this->TABLA."()";
        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valoresConsultados"=>$this->filas_json);
            
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
        
    }
    function obtener_registro_todos_los_registros_pedido(){
        
        $this->sentencia_sql="CALL pa_consultar_".$this->TABLA."_pedido()";
        
        
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
    
    function eliminar_entrada(){
        $this->sentencia_sql="DELETE FROM entradas WHERE IdEntrada='$this->valor_id_entrada'";
        if($this->ejecutar_sentencia_sql()){
            return TRUE;
        }
        return FALSE;
    }
    function consultar_codigo_entrada(){
        $this->sentencia_sql="SELECT fun_consultar_codigo_entrada() as respuesta";
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Codigo generado","respuesta"=>TRUE,"codigo_factura"=>  $this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    
    
}
