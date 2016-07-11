var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
var _txtNitProveedorSalida;
var _txtCodigoProductoSalida;
var _txtCantidadSalida;

/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/

var _btnConsulta;
var _btnIngresarSalida;
var _btnAgregarAListaSalida;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistro;
var _formConsulta;

var producto_pendiente_salida;
var lista_de_salida=[];
var proveedor_salida;
function iniciar_contexto_salida_otros(){
   
     _contexto="_salida";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    _txtNitProveedorSalida="txtNitProveedorSalidaOtros";
    _txtCodigoProductoSalida="txtCodigoProductoSalidaOtro";
    
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
    
     
     _btnConsulta="btnBuscarSalida";
     _btnAgregarAListaSalida="btnAgregarAListaSalidaOtros";
     _btnIngresarSalida="btnIngresarSalidaOtros";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistro;
     _formConsulta="formConsultarSalida";
    
   agregarEvento(_txtNitProveedorSalida,"change",consultarProveedorSalida); 
   agregarEvento(_txtCodigoProductoSalida,"change",consultarProductoSalida); 
   agregarEvento(_btnAgregarAListaSalida,"click",agregarProductoAListaSalida); 
   agregarEvento(_btnIngresarSalida,"click",registrarContextoSalidaOtros);
   agregarEvento(_btnConsulta,"click",consultarContextoSalidaOtros);
    
   
   
}



/* INSERTAR CONTEXTO*/    
function registrarContextoSalidaOtros(){
    //1-Obtengo los datos del formulario
    
    if(Object.keys(lista_de_salida).length>0 && document.getElementById("selTipoSalida").value != "0"){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={         id_empleado:obtener_id_usuario(),
                            codigo_salida:document.getElementById("txtCodigoFacturaSalidaOtros").value,
                            lista_salida:lista_de_salida,
                            id_proveedor:proveedor_salida.IdProveedor,
                            tipo_salida:document.getElementById("selTipoSalida").value};
        //Invoco mi funcion 
        registrarDato("crearotros"+_contexto,datos,mostrarMensaje);
        document.getElementById("txtCodigoFacturaSalidaOtros").value="";
        document.getElementById("selTipoSalida").value="0";
        document.getElementById("tblListaSalidaOtros").innerHTML="";
    }else{
        var msn;
        if(document.getElementById("selTipoSalida").value=="0"){
             msn="por selecciona un tipo de salida";
        }else{
            msn="por favor ingresa productos";
        }
       mostrarMensaje({mensaje:msn});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoSalidaOtros(){
    var valores=obtener_valores_formulario(_formConsulta);
    if(valores!=false){
        consultarDatos("consultar"+_contexto,{codigo_salida:valores.Texto[0]},dibujarListaProductoConsulta);   
    }
    
}
function dibujarListaProductoConsulta(datos){
    console.log(datos);
    if(datos.valores_consultados!=undefined){
        $('#resBusSalida').fadeIn('slow');
        var div=document.getElementById("resBusSalida");
        div.innerHTML="";
        var tabla=document.createElement("table");
        var cuerpo=document.createElement("tbody");
        tabla.className="resultadoEdicionProv";
           var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Codigo producto";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Nombre producto";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Precio venta";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Cantidad vendida";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Valor";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.className="salirRes";
            celda.innerHTML="Salir";
            fila.appendChild(celda);
            cuerpo.appendChild(fila);
        for(var d in datos.valores_consultados){
            
             var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("id","codProducto_"+datos.valores_consultados[d].IdFactura);
            inp.setAttribute("type","text");
            inp.value=datos.valores_consultados[d].CodigoProducto;
            celda.appendChild(inp);         
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombreProducto_"+datos.valores_consultados[d].IdFactura);
            inp.value=datos.valores_consultados[d].NombreProducto;
            
            
            celda.appendChild(inp);         
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","precioVenta_"+datos.valores_consultados[d].IdFactura);
            inp.value=datos.valores_consultados[d].PrecioVentaDefinitivo;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","cantVendida_"+datos.valores_consultados[d].IdFactura);
            inp.value=datos.valores_consultados[d].Cantidad;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","valorProducto_"+datos.valores_consultados[d].IdFactura);
            inp.value=datos.valores_consultados[d].ValorProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
            
             
            
            
            var celda=document.createElement("td"); 
            fila.appendChild(celda);
            fila.setAttribute("id",""+datos.valores_consultados[d].IdFactura);
            cuerpo.appendChild(fila);
        }
        tabla.appendChild(cuerpo);
        div.appendChild(tabla);
    }
}
function consultarProveedorSalida(){
    
    var d={nit:document.getElementById(_txtNitProveedorSalida).value};
    if(d.nit!=""){
        consultarDatos("consultarpornit_proveedor",d,dibujarProveedorSalidaOtros);
    }else{
        mostrarMensaje({mensaje:"ingrese un valor para buscar"});
    }
    
}
function dibujarProveedorSalidaOtros(datos){
    if(datos.valores_consultados!=undefined){
        console.log(datos.valores_consultados[0].NombreProveedor);
        var txtNombreProveedorSalida=document.getElementById("h3NombreProveedorSalidaOtros");
        txtNombreProveedorSalida.innerHTML=datos.valores_consultados[0].NombreProveedor;
        console.log(txtNombreProveedorSalida.innerHTML);
        proveedor_salida=datos.valores_consultados[0];
    }
    
    
}
function consultarProductoSalida(){
  if(proveedor_salida != undefined){
    var d={codigo:document.getElementById(_txtCodigoProductoSalida).value,idProveedor:proveedor_salida.IdProveedor};
    if(d.codigo!=""){
        consultarDatos("validarDetalleProductoProveedor_producto",d,dibujarProductoSalidaOtros);
    }else{
        mostrarMensaje({mensaje:"ingrese un valor para buscar"});
    }  
  }else{
      mostrarMensaje({mensaje:"por favor selecciona un proveedor"});
  }
    
}
function dibujarProductoSalidaOtros(datos){
    if(datos.respuesta){
        console.log(datos.registros_consultados);
        var da=eval(datos.registros_consultados);
        
        var txtNombreProductoSalida=document.getElementById("h3NombreProductoSalidaOtros");
        txtNombreProductoSalida.innerHTML=da[0].NombreProducto;
        producto_pendiente_salida=da[0];
        console.log(producto_pendiente_salida.IdDetalleProveedor);
    }else{
        mostrarMensaje(datos);
    }
    
    
}
function agregarProductoAListaSalida(){
    
    var cant=document.getElementById("txtCantidadSalidaOtros");
    var comentario=document.getElementById("txtComentarioSalidaOtros");
    if(cant.value!=""){
        var tBody=document.getElementById("tblListaSalidaOtros");
        
        var fila=document.createElement("tr");
        
        var celda=document.createElement("td");
        celda.innerHTML=producto_pendiente_salida.CodigoProducto;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=producto_pendiente_salida.NombreProducto;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=cant.value;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=comentario.value;
        fila.appendChild(celda);
        
        
        producto_pendiente_salida.cantidad_salida=cant.value;
        producto_pendiente_salida.comentario=comentario.value;
        
        tBody.appendChild(fila);
        lista_de_salida.push(producto_pendiente_salida);
    }
    else{
        mostrarMensaje({mensaje:"por favor ingresa una cantidad"})
    }
        
}