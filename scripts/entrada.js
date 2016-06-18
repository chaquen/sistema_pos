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
function iniciar_contexto_entrada(){
   
     _contexto="_entrada";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    _txtNitProveedorEntrada="txtNitProveedorEntrada";
    _txtCodigoProducto="txtCodigoProducto";
    
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
    
     
     _btnConsulta;
     _btnAgregarAListaEntrada="btnAgregarAListaEntrada";
     _btnIngresarEntrada="btnIngresarEntrada";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistro;
     _formConsulta;
    
   agregarEvento(_txtNitProveedorEntrada,"change",consultarProveedor); 
   agregarEvento(_txtCodigoProducto,"change",consultarProducto); 
   agregarEvento(_btnAgregarAListaEntrada,"click",agregarProductoALista); 
   agregarEvento(_btnIngresarEntrada,"click",registrarContextoEntrada);
   //agregarEvento(_btnConsulta,"click",consultarContextoEntrada);
   
   
}



/* INSERTAR CONTEXTO*/    
function registrarContextoEntrada(){
    //1-Obtengo los datos del formulario
    lista_de_entrada
    if(Object.keys(lista_de_entrada).length>0){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={id_empleado:1,codigo_entrada:document.getElementById("txtCodigoFactura").value,lista_pedido:lista_de_entrada,id_proveedor:proveedor.IdProveedor};
        //Invoco mi funcion 
        registrarDato("crearpedido"+_contexto,datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa productos"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoEntrada(){
    consultarDatos("consultar_"+_contexto,null,imprimir);   
}
function consultarProveedor(){
    
    var d={nit:document.getElementById(_txtNitProveedorEntrada).value};
    if(d.nit!=""){
        consultarDatos("consultarpornit_proveedor",d,dibujarProveedorEntrada);
    }else{
        mostrarMensaje({mensaje:"ingrese un valor para buscar"});
    }
    
}
function dibujarProveedorEntrada(datos){
    if(datos.valores_consultados!=undefined){
        console.log(datos.valores_consultados[0].NombreProveedor);
        var txtNombreProveedorEntrada=document.getElementById("txtNombreProveedorEntrada");
        txtNombreProveedorEntrada.innerHTML=datos.valores_consultados[0].NombreProveedor;
        console.log(txtNombreProveedorEntrada.innerHTML);
        proveedor=datos.valores_consultados[0];
    }
    
    
}
function consultarProducto(){
    var d={codigo:document.getElementById(_txtCodigoProducto).value};
    if(d.codigo!=""){
        consultarDatos("consultarporcodigo_producto",d,dibujarProductoEntrada);
    }else{
        mostrarMensaje({mensaje:"ingrese un valor para buscar"});
    }
}
function dibujarProductoEntrada(datos){
    if(datos.valores_consultados!=undefined){
        var txtNombreProductoEntrada=document.getElementById("txtNombreProductoEntrada");
        txtNombreProductoEntrada.innerHTML=datos.valores_consultados[0].NombreProducto;
        producto_pendiente=datos.valores_consultados[0];
    }
    
    
}
function agregarProductoALista(){
    var cant=document.getElementById("txtCantidadIngresar");
    //var precio=document.getElementById("txtPrecioEntrada");
    if(cant.value!=""){
        var tBody=document.getElementById("tblListaEntrada");
        
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
        //producto_pendiente.precio_entrada=precio.value;
        producto_pendiente.precio_entrada=0;
        
        tBody.appendChild(fila);
        lista_de_entrada.push(producto_pendiente);
    }else{
        mostrarMensaje({mensaje:"por favor ingresa una cantidad"})
    }
        
}