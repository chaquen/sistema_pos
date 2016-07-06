<?php

class Factura extends ModeloBaseDeDatos{
    private $TABLA='factura';
    public $valor_id_factura;
    public $valor_codigo_factura;
    public $valor_fecha_factura;
    public $valor_estado_factura;
    public $valor_id_empleado;
    public $valor_id_cliente;
    

    public function __construct() {
        
    }
    
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function crear_registro(){
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."('$this->valor_codigo_factura','$this->valor_fecha_factura','$this->valor_estado_factura','$this->valor_id_empleado','$this->valor_id_cliente') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE,"nuevo_registro"=>$this->respuesta_funcion->respuesta,"sentencia"=>  $this->sentencia_sql);
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
    function crear_detalle_factura($id_producto,$valor_producto,$cantidad_vendida){
        
        $this->sentencia_sql="SELECT fun_registrar_detalle_".$this->TABLA."('$this->valor_id_factura','$id_producto','$cantidad_vendida','$valor_producto') as respuesta";
        if($this->ejecutar_funcion_sql()){
            //return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
            return TRUE;
        }else{
            //return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
            return FALSE;
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
    function consultar_codigo_factura(){
        $this->sentencia_sql="SELECT fun_consultar_codigo_factura() as respuesta";
        if($this->ejecutar_funcion_sql()){
            return array("codigo"=>"00","mensaje"=>  "Codigo generado","respuesta"=>TRUE,"codigo_factura"=>  $this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    
    function eliminar_factura(){
        $this->sentencia_sql="DELETE FROM ".$this->TABLA." WHERE IdFactura='$this->valor_id_factura'";
        if($this->ejecutar_sentencia_sql()){
            return TRUE;
        }
        return FALSE;
    }
}
