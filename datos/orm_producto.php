<?php

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
        
        $this->sentencia_sql="SELECT fun_registrar_".$this->TABLA."('$this->valor_codigo_producto','$this->valor_nombre_producto','$this->valor_descripcion_producto','$this->valor_fk_id_categoria','$this->valor_precio_venta') as respuesta";
                
        if($this->ejecutar_funcion_sql()){
            
            return array("codigo"=>"00","mensaje"=>  "Se ha creado un nuevo registro en $this->TABLA ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }
    }    
    //$obj=> array("id_empresa"=>'mi valor uno',"nombre_empresa"=>'mi valor dos')
    function obtener_registro_todos_los_registros(){
        $this->sentencia_sql="CALL pa_consultar_todos_los_".$this->TABLA."()";        
        
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
        
    }
    function obtener_registro_todos_los_registros_por_codigo(){
        //$this->sentencia_sql="CALL pa_consultar_".$this->TABLA."_por_codigo('$this->valor_codigo_producto')";        
        $this->sentencia_sql="SELECT * FROM vw_productos v WHERE v.CodigoProducto = '$this->valor_codigo_producto' OR v.NombreProducto LIKE '$this->valor_codigo_producto%'";
        if($this->ejecutar_consulta_sql()){
            //return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE);
            return array("codigo"=>"00","mensaje"=>"Estos son los resultados de la consulta a la tabla $this->TABLA","respuesta"=>TRUE,"valores_consultados"=>$this->filas_json);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>TRUE);
        }
        
    }
    function eliminar_registro(){
        //$this->sentencia_sql="SELECT fun_actualizar_estado_".$this->TABLA."('$this->valor_id_producto')";
        $this->sentencia_sql="UPDATE ".$this->TABLA." SET EstadoProducto='0' WHERE IdProducto='$this->valor_id_producto' ";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido eliminado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function activar_registro(){
        //$this->sentencia_sql="SELECT fun_actualizar_estado_".$this->TABLA."('$this->valor_id_producto')";
        $this->sentencia_sql="UPDATE ".$this->TABLA." SET EstadoProducto='1' WHERE IdProducto='$this->valor_id_producto' ";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "registro en la tabla $this->TABLA ha sido eliminado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function actualizar_recurso(){
         $this->sentencia_sql="UPDATE producto 
                    SET CodigoProducto= '$this->valor_codigo_producto',
                        NombreProducto='$this->valor_nombre_producto',
                        DescripcionProducto='$this->valor_descripcion_producto',
                        Fk_Id_Categoria='$this->valor_fk_id_categoria',
                        PrecioVentaDefinitivo='$this->valor_precio_venta'
                    WHERE IdProducto='$this->valor_id_producto'";
        //$this->sentencia_sql="SELECT fun_actualizar_".$this->TABLA."('$this->valor_id_producto','$this->valor_codigo_producto','$this->valor_nombre_producto','$this->valor_descripcion_producto','$this->valor_fk_id_categoria','$this->valor_precio_venta')";
        if($this->ejecutar_sentencia_sql()){
            return array("codigo"=>"00","mensaje"=>  "El registro en la tabla $this->TABLA ha sido actualizado","respuesta"=>TRUE);
        }else{
            return array("codigo"=>"01","mensaje"=>  $this->mensajeDepuracion,"respuesta"=>FALSE);
        }
    }
    function asociar_producto_proveedor($idProducto,$idproveedor,$cantidad){
        $this->sentencia_sql="SELECT fun_asociar_producto_con_proveedor('$idProducto','$idproveedor','$cantidad') as respuesta";
        if ($this->ejecutar_funcion_sql()){
           return array("codigo"=>"00","mensaje"=>  "Producto asociado exitosamente ","respuesta"=>TRUE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }else{
           return array("codigo"=>"00","mensaje"=>  "Opps! ha ocurrido un error al intentar asociar este producto","respuesta"=>FALSE,"nuevo_registro"=>$this->respuesta_funcion->respuesta);
        }
    }
    function consultar_id_detalle_producto_proveedor($codProducto,$idproveedor){
        $this->sentencia_sql="CALL pa_consultar_id_detalle_producto_proveedor('$codProducto','$idproveedor')";
        if ($this->ejecutar_consulta_sql()){
            return array("codigo"=>"00","mensaje"=>"Registro consultado","respuesta"=>TRUE,"registros_consultados"=>  $this->filas_json);
           
        }else{
               return array("codigo"=>"01","mensaje"=>  "Lo sentimos pero este producto no tiene existencias para este proveedor","respuesta"=>FALSE);
        }
    }	
    
}
