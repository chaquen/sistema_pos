var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroFactura;
var _btnAgregarListaFactura;
var _txtCedulaCliente;
var _txtCodigoDelProducto;
var _txtCantidadVenta;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistro;

var _producto_factura;

var _lista_factura=[];
var cliente;
var _IVA=0;
function iniciar_contexto_factura(){
   
     _contexto='_factura';//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroFactura='btnCrearFactura';
     _btnAgregarListaFactura='btnAgregarListaFactura';
     _txtCedulaCliente='txtCedulaCliente';
     _txtCodigoDelProducto='txtCodigoDelProducto';
     _txtCantidadVenta='txtCantidadVenta';
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistro='formFacturaVenta';
    
    
   agregarEvento(_btnRegistroFactura,"click",registrarContextoFactura);
   agregarEvento(_btnAgregarListaFactura,"click",agregarProductoAListaFactura);
   agregarEvento(_txtCedulaCliente,"change",consultarClienteFactura);
   agregarEvento(_txtCodigoDelProducto,"change",consultarProductoFactura);
   agregarEvento(_txtCantidadVenta,"change",calcularPrecioItem);
   
   consultar_codigo_factura();
   consultar_iva();
   
}
function consultar_iva(){
    if(this.value!=""){
        
        consultarDatos("consultarIVA"+_contexto,{},cargar_valor_iva);  
    }
}
function cargar_valor_iva(d){
    var valores_devueltos=d.valores_consultados;
    var valor=new Number(valores_devueltos.ValorImpuesto);
    _IVA=valor.ValorImpuesto/100;
}
/* INSERTAR CONTEXTO*/    
function registrarContextoFactura(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistro);   
    if(valores_formulario){
        //Creo el objeto que voy a enviar con datos a la peticion
        if(cliente!=undefined){
            var n=false;
            var d=cliente.IdUsuarioCliente;
            var nom="";
        }else{
            var n=true;
            var d=document.getElementById("txtCedulaCliente").value;
            var nom=document.getElementById("txtNombreCliente").value;
        }
        
        if(document.getElementById("selTipoPago").value=="Debito" || document.getElementById("selTipoPago").value=="Credito"){
            var t=document.getElementById("txtDineroNumTarjeta").value;
        }else{
            var t=false;
        }
        var datos={
            nuevo_cliente:n,
            documento_cliente:d,
            nombre_cliente:nom,
            tarjeta:t,
            codigo_factura:document.getElementById("h1NumeroFactura").value,
            estado_factura:"Despachada",        
            id_empleado:obtener_id_usuario(),
            lista_factura:_lista_factura
        };
   
        registrarDato("crear"+_contexto,datos,mostrarMensaje,_formRegistro);
        consultar_codigo_factura();
        
        document.getElementById("tdbListaFactura").innerHTML="";
        _lista_factura="";
        _producto_factura="";
        document.getElementById("h3ValorTotalUnidades").innerHTML="$ "+formato_numero(0,"2",".",",");
        document.getElementById("h3ValorTotalUnidades").value=0;
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function consultarClienteFactura(){
    if(this.value!=""){
        var datos={documento_cliente:this.value};
        consultarDatos("consultar_cliente",datos,dibujar_registro_cliente);  
    }
}
function dibujar_registro_cliente(datos){
    if(datos.respuesta){
        var d=eval(datos.valoresConsultados);
        cliente=d[0];
        //console.log(datos.valoresConsultados);
        //console.log(cliente);
        document.getElementById("txtNombreCliente").value=cliente.NombreUsuario+" "+cliente.ApellidoUsuario;
    }
}
function consultarProductoFactura(){
    if(this.value){
        var datos={codigo:this.value};
        consultarDatos("consultarporcodigo_producto",datos,dibujarInformacionProducto);
    }else{
        console.log(this.value);
    }
}
function dibujarInformacionProducto(datos){
    if(datos.respuesta){
        var d=eval(datos.valores_consultados);
       _producto_factura=d[0];
       if(_producto_factura.EstadoProducto==1){
           console.log(_producto_factura);
           document.getElementById("h3NombreProductoFactura").value=_producto_factura.NombreProducto;
           document.getElementById("h3NombreProductoFactura").innerHTML=_producto_factura.NombreProducto;
           document.getElementById("h3ValorUnidad").value=_producto_factura.PrecioVentaDefinitivo;
           document.getElementById("h3ValorUnidad").innerHTML="$ "+formato_numero(_producto_factura.PrecioVentaDefinitivo,"0",".",","); 
       }else{
           mostrarMensaje({mensaje:"Lo sentimos pero este producto no esta activo para la venta por favor comunicate con tu administrador"});
       }
       
       
    }
    
}
function calcularPrecioItem(){
    
    if(this.value!="" && document.getElementById("h3NombreProductoFactura").value!="" ){
        var valor=new Number(document.getElementById("h3ValorUnidad").value);
        var cant=new Number(document.getElementById("txtCantidadVenta").value);
        var total=cant*valor;
        document.getElementById("h3ValorTotalUnidades").innerHTML="$ "+formato_numero(total,"2",".",",");
        document.getElementById("h3ValorTotalUnidades").value=total;
    }
}
function agregarProductoAListaFactura (){
    _producto_factura.cantidad_vendida=document.getElementById("txtCantidadVenta").value;
    _producto_factura.precio_total_venta=document.getElementById("h3ValorUnidad").value;
    _producto_factura.total=document.getElementById("h3ValorTotalUnidades").value;
    
    
    console.log(_producto_factura);
    if(_producto_factura.cantidad_vendida!="" && _producto_factura.cantidad_vendida<=_producto_factura.ExistenciasTotalBodega){
        var tBody=document.getElementById("tdbListaFactura");	
        
        var fila=document.createElement("tr");
        
        var celda=document.createElement("td");
        celda.innerHTML=_producto_factura.CodigoProducto;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=_producto_factura.NombreProducto;
        fila.appendChild(celda);
        
        var celda=document.createElement("td");
        celda.innerHTML=_producto_factura.precio_total_venta;
        fila.appendChild(celda);
        
        
        var celda=document.createElement("td");
        celda.innerHTML=_producto_factura.cantidad_vendida;
        fila.appendChild(celda);
                
         var celda=document.createElement("td");
        celda.innerHTML=_producto_factura.total;
        fila.appendChild(celda);
        var celda=document.createElement("td");
        var h=document.createElement("h3");
        h.innerHTML="X";
        h.setAttribute("onclick","quitar_item('"+_producto_factura.CodigoProducto+"')");
        celda.appendChild(h);
        fila.appendChild(celda);
        
        tBody.appendChild(fila);
        _lista_factura.push(_producto_factura);
        
        document.getElementById("txtCodigoDelProducto").value="";
        document.getElementById("txtCantidadVenta").value="";
        document.getElementById("h3ValorUnidad").value="";
        document.getElementById("h3ValorTotalUnidades").value="";
        document.getElementById("h3ValorUnidad").innerHTML="$ 0.00";
        document.getElementById("h3ValorTotalUnidades").innerHTML="$ 0.00";
        document.getElementById("h3NombreProductoFactura").innerHTML="Nombre producto";
        
    }
    else{
        if(_producto_factura.cantidad_vendida > _producto_factura.ExistenciasTotalBodega){
            mostrarMensaje({mensaje:"Lo sentimos pero no hay suficientes existencias para la venta"});
        }else{
            mostrarMensaje({mensaje:"por favor selecciona un producto e ingresa una cantidad"});
        }
        
    }
    
    
    calcular_valores_totales();
}
function redibujarTabla(){
   document.getElementById("tdbListaFactura").innerHTML="";
        for(var i in _lista_factura){
            
            var tBody=document.getElementById("tdbListaFactura");	

            var fila=document.createElement("tr");

            var celda=document.createElement("td");
            celda.innerHTML=_lista_factura[i].CodigoProducto;
            fila.appendChild(celda);

            var celda=document.createElement("td");
            celda.innerHTML=_lista_factura[i].NombreProducto;
            fila.appendChild(celda);

            var celda=document.createElement("td");
            celda.innerHTML=_lista_factura[i].precio_total_venta;
            fila.appendChild(celda);


            var celda=document.createElement("td");
            celda.innerHTML=_lista_factura[i].cantidad_vendida;
            fila.appendChild(celda);

             var celda=document.createElement("td");
            celda.innerHTML=_lista_factura[i].total;
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var h=document.createElement("h3");
            h.innerHTML="X";
            h.setAttribute("onclick","quitar_item('"+_lista_factura[i].CodigoProducto+"')");
            celda.appendChild(h);
            fila.appendChild(celda);

            tBody.appendChild(fila);
        }    
    
    calcular_valores_totales();
}
function quitar_item(cod){
    var p=0;
    var pos;
    for(var i in _lista_factura){
        if(_lista_factura[i].CodigoProducto==cod){
          pos=p;  
          console.log(pos);
        }else{
            p++;
        }
    }
    if(pos!=undefined){
        _lista_factura.splice(pos,1);
        calcular_valores_totales();
        redibujarTabla();
    }
    console.log(_lista_factura);
    
    
}
function calcular_valores_totales(){
    if(_lista_factura.length>0){
        var total=0;
        var iva=0;
        var subTotal=0;
        for(var i in _lista_factura){
            subTotal+=_lista_factura[i].total;
        }
        iva=subTotal*_IVA;
        total=subTotal+iva;
        document.getElementById("tdSubTotal").value=subTotal;
        document.getElementById("tdSubTotal").innerHTML="$ "+formato_numero(subTotal,"2",",",".");
        document.getElementById("tdIva").value=iva;
        document.getElementById("tdIva").innerHTML="$ "+formato_numero(iva,"2",",",".");
        document.getElementById("tdTotal").value=total;
        document.getElementById("tdTotal").innerHTML="$ "+formato_numero(total,"2",",",".");
    
    }else{
        document.getElementById("tdSubTotal").value=0;
        document.getElementById("tdSubTotal").innerHTML="$ "+formato_numero(0,"2",",",".");
        document.getElementById("tdIva").value=0;
        document.getElementById("tdIva").innerHTML="$ "+formato_numero(0,"2",",",".");
        document.getElementById("tdTotal").value=0;
        document.getElementById("tdTotal").innerHTML="$ "+formato_numero(0,"2",",",".");
    }
    
}
function consultar_codigo_factura(){
    consultarDatos("consultarCodigo"+_contexto,null,dibujarCodigoFactura);
}
function dibujarCodigoFactura(datos){
    document.getElementById("h1NumeroFactura").value=datos.codigo_factura;
    document.getElementById("h1NumeroFactura").innerHTML="Nº "+datos.codigo_factura;
}