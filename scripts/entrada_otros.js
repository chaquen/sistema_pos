var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
var _txtNitProveedorEntrada;
var _txtCodigoProducto;
var _txtCantidadIngresar;

/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/

var _btnConsulta;
var _btnIngresarEntrada;
var _btnAgregarAListaEntrada;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistro;
var _formConsulta;

var producto_pendiente;
var lista_de_entrada=[];
var proveedor;
function iniciar_contexto_entrada_otros(){
  
     _contexto="_entrada";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    _txtNitProveedorEntrada="txtNitProveedorEntradaOtros";
    _txtCodigoProducto="txtCodigoProductoOtro";
    
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
    
     
     _btnConsulta;
     _btnAgregarAListaEntrada="btnAgregarAListaEntradaOtros";
     _btnIngresarEntrada="btnIngresarEntradaOtros";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistro;
     _formConsulta;
    
   agregarEvento(_txtNitProveedorEntrada,"change",consultarProveedorOtros); 
   agregarEvento(_txtCodigoProducto,"change",consultarProductoOtros); 
   agregarEvento(_btnAgregarAListaEntrada,"click",agregarProductoAListaOtros); 
   agregarEvento(_btnIngresarEntrada,"click",registrarContextoEntradaOtros);
   //agregarEvento(_btnConsulta,"click",consultarContextoEntrada);
   
   
}



/* INSERTAR CONTEXTO*/    
function registrarContextoEntradaOtros(){
    //1-Obtengo los datos del formulario
    
    if(Object.keys(lista_de_entrada).length>0){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={id_empleado:obtener_id_usuario(),codigo_entrada:document.getElementById("txtCodigoFacturaOtros").value,lista_pedido:lista_de_entrada,id_proveedor:proveedor.IdProveedor,tipo_devolucion:document.getElementById("selTipoEntrada").value};
        //Invoco mi funcion 
        registrarDato("crearotros"+_contexto,datos,mostrarMensaje);
        document.getElementById("txtCodigoFacturaOtros").value="";
        document.getElementById("tblListaEntradaOtros").innerHTML="";
    }else{
       mostrarMensaje({mensaje:"por favor ingresa productos"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoEntradaOtros(){
    consultarDatos("consultar_"+_contexto,null,imprimir);   
}
function consultarProveedorOtros(){
    
    var d={nit:document.getElementById(_txtNitProveedorEntrada).value};
    if(d.nit!=""){
        consultarDatos("consultarpornit_proveedor",d,dibujarProveedorEntradaOtros);
    }else{
        mostrarMensaje({mensaje:"ingrese un valor para buscar"});
    }
    
}
function dibujarProveedorEntradaOtros(datos){
    if(datos.valores_consultados!=undefined){
        console.log(datos.valores_consultados[0].NombreProveedor);
        var txtNombreProveedorEntrada=document.getElementById("txtNombreProveedorEntradaOtros");
        txtNombreProveedorEntrada.innerHTML=datos.valores_consultados[0].NombreProveedor;
        console.log(txtNombreProveedorEntrada.innerHTML);
        proveedor=datos.valores_consultados[0];
    }
    
    
}
function consultarProductoOtros(){
    var d={codigo:document.getElementById(_txtCodigoProducto).value};
    if(d.codigo!=""){
        consultarDatos("consultarporcodigo_producto",d,dibujarProductoEntradaOtros);
    }else{
        mostrarMensaje({mensaje:"ingrese un valor para buscar"});
    }
}
function dibujarProductoEntradaOtros(datos){
    if(datos.valores_consultados!=undefined){
        var txtNombreProductoEntrada=document.getElementById("txtNombreProductoEntradaOtros");
        txtNombreProductoEntrada.innerHTML=datos.valores_consultados[0].NombreProducto;
        producto_pendiente=datos.valores_consultados[0];
    }
    
    
}
function agregarProductoAListaOtros(){
    var cant=document.getElementById("txtCantidadIngresarOtros");
    var comentario=document.getElementById("txtComentarioOtros");
    if(cant.value!=""){
        var tBody=document.getElementById("tblListaEntradaOtros");
        
        var fila=document.createElement("tr");
        
        var celda=document.createElement("td");
        celda.innerHTML=producto_pendiente.CodigoProducto;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=producto_pendiente.NombreProducto;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=cant.value;
        fila.appendChild(celda);
        producto_pendiente.cantidad_entrada=cant.value;
        producto_pendiente.comentario=comentario.value;
        
        tBody.appendChild(fila);
        lista_de_entrada.push(producto_pendiente);
    }else{
        mostrarMensaje({mensaje:"por favor ingresa una cantidad"})
    }
        
}