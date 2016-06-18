var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistro;
var _btnConsulta;

var _btnBuscarEditarProveedor;
var _btnBuscarEliminarProveedor;
var _btnEliminar;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistro;
var _formConsulta;
var _formBuscarActualizar;
var _formBuscarEliminar;


function iniciar_contexto_proveedor(){
   
     _contexto="_proveedor";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistro="btnCrearProveedor";
     _btnConsulta="btnBuscarProveedor";
     _btnBuscarEditarProveedor="btnBuscarEditarProveedor";
     __btnBuscarEliminarProveedor="btnBuscarEliminarProveedor";
     _btnBuscarCategoriaEliminar;
     _btnEliminar;
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistro="formRegistroProveedor";
     _formConsulta="formConsultarProveedor";
     _formBuscarActualizar="formBuscarEditarProveedor";
     _formBuscarEliminar="formBuscarElimiarProveedor";
    
    
   agregarEvento(_btnRegistro,"click",registrarContextoProveedor);
   agregarEvento(_btnConsulta,"click",consultarContextoProveedor);
   
   agregarEvento(_btnBuscarEditarProveedor,"click",buscarProveedorEdicion);
   agregarEvento(__btnBuscarEliminarProveedor,"click",buscarProveedorEliminar);
   
}

/* INSERTAR CONTEXTO*/    
function registrarContextoProveedor(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistro);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={nombre:vf.Texto[0],nit:vf.Texto[1],nombre_contacto:vf.Texto[2],telefono_contacto:vf.Texto[3],correo_contacto:vf.Texto[4]};
        //Invoco mi funcion 
        registrarDato("crear"+_contexto,datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoProveedor(){
    
    consultarDatos("consultar"+_contexto,null,dibujarProveedorConsulta);   
}
function dibujarProveedorConsulta(datos){
    console.log(datos);
    if(datos.valores_consultados!=undefined){
        var div=document.getElementById("divListaProveedores");
        div.innerHTML="";
        var tabla=document.createElement("table");
        tabla.className="resultadoProd";
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Nit";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre del proveedor";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre del contacto";
            var celda=document.createElement("td");
            celda.innerHTML="Teléfono";
            var celda=document.createElement("td");
            celda.innerHTML="Email";
            var celda=document.createElement("td");
            celda.innerHTML="Dirección";
            var celda=document.createElement("td");
            celda.className="salirRes";
            celda.innerHTML="Salir";
            
        for(var d in datos.valores_consultados){
            console.log(datos.valores_consultados[d]);
            
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("id","nit_"+datos.valores_consultados[d].IdProveedor);
            inp.setAttribute("type","text");
            inp.value=datos.valores_consultados[d].Nit;
            celda.appendChild(inp);         
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombreProveedor_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].NombreProveedor;
            console.log (datos.valores_consultados[d].NombreProveedor); 
            console.log(inp.value);
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombreContacto_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].NombreContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","telefono_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].TelefonoContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","email_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].CorreoContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","direccion_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].DireccionProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
            tabla.appendChild(fila);
        }
        div.appendChild(tabla);
    }
}
/*EDITAR CONTEXTO*/
function buscarProveedorEdicion(){
   
    var d={nit:document.getElementById("txtBuscarProveedorEdicion").value};
    if(d.nit!=""){
        consultarDatos("consultarpornit"+_contexto,d,dibujarProveedorEdicion);   
    }else{
        mostrarMensaje({mensaje:"por favor ingrese valores para consultar"});
    }
    
}
function dibujarProveedorEdicion(datos){
    if(datos.valores_consultados!=undefined){
        var div=document.getElementById("divListaEdicionProveedores");
        div.innerHTML="";
        var tabla=document.createElement("table");
        tabla.className="resultadoProd";
           var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Nit";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre del proveedor";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre del contacto";
            var celda=document.createElement("td");
            celda.innerHTML="Teléfono";
            var celda=document.createElement("td");
            celda.innerHTML="Email";
            var celda=document.createElement("td");
            celda.innerHTML="Dirección";
            var celda=document.createElement("td");
            celda.className="salirRes";
            celda.innerHTML="Salir";
            
        for(var d in datos.valores_consultados){
            
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("id","nit_"+datos.valores_consultados[d].IdProveedor);
            inp.setAttribute("type","text");
            inp.value=datos.valores_consultados[d].Nit;
            celda.appendChild(inp);         
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombreProveedor_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].NombreProveedor;
            console.log (datos.valores_consultados[d].NombreProveedor); 
            console.log(inp.value);
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombreContacto_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].NombreContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","telefono_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].TelefonoContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","email_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].CorreoContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","direccion_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].DireccionProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","button");
            inp.setAttribute("value","Editar");
            inp.setAttribute("onclick","editarContextoProveedor('"+datos.valores_consultados[d].IdProveedor+"')");
            celda.appendChild(inp); 
            fila.appendChild(celda);
            fila.setAttribute("id",""+datos.valores_consultados[d].IdProveedor);
            tabla.appendChild(fila);
        }
        div.appendChild(tabla);
    }
}
function editarContextoProveedor(id){
    var nit=document.getElementById("_"+id);
    var nombre=document.getElementById("nombreProveedor_"+id).value;
    var contacto=document.getElementById("nombreContacto_"+id).value;
    var telefono=document.getElementById("telefono_"+id).value;
    var direccion=document.getElementById("direccion_"+id).value;
    var correo=document.getElementById("email_"+id).value;
    if(nombre!=""){
        var datos={nombre:nombre,nombre_contacto:contacto,telefono_contacto:telefono,correo_contacto:correo,direccion:direccion,nit:nit};
        editarDato("actualizar"+_contexto,datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function buscarProveedorEliminar(){
    
    var d={nit:document.getElementById("txtBuscarProveedorEliminar").value};
    if(d.nit!=""){
        consultarDatos("consultarpornit"+_contexto,d,dibujarProveedorEliminar);   
    }else{
        mostrarMensaje({mensaje:"por favor ingrese valores para consultar"});
    }
    
}
function dibujarProveedorEliminar(datos){
    if(datos.valores_consultados!=undefined){
        var div=document.getElementById("divListaEliminarProveedores");
        div.innerHTML="";
        var tabla=document.createElement("table");
        tabla.className="resultadoProd";
           var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Nit";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre del proveedor";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre del contacto";
            var celda=document.createElement("td");
            celda.innerHTML="Teléfono";
            var celda=document.createElement("td");
            celda.innerHTML="Email";
            var celda=document.createElement("td");
            celda.innerHTML="Dirección";
            var celda=document.createElement("td");
            celda.className="salirRes";
            celda.innerHTML="Salir";
            
        for(var d in datos.valores_consultados){
            
             var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("id","nit_"+datos.valores_consultados[d].IdProveedor);
            inp.setAttribute("type","text");
            inp.value=datos.valores_consultados[d].Nit;
            celda.appendChild(inp);         
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombreProveedor_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].NombreProveedor;
            console.log (datos.valores_consultados[d].NombreProveedor); 
            console.log(inp.value);
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombreContacto_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].NombreContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","telefono_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].TelefonoContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","email_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].CorreoContactoProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","direccion_"+datos.valores_consultados[d].IdProveedor);
            inp.value=datos.valores_consultados[d].DireccionProveedor;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
             
            
            
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","button");
            inp.setAttribute("value","Eliminar");
            inp.setAttribute("onclick","eliminarContextoProveedor('"+datos.valores_consultados[d].IdProveedor+"')");
            celda.appendChild(inp); 
            fila.appendChild(celda);
            fila.setAttribute("id",""+datos.valores_consultados[d].IdProveedor);
            tabla.appendChild(fila);
        }
        div.appendChild(tabla);
    }
}


function eliminarContextoProveedor(id){
    
    if(id!=undefined){
        eliminarDato("eliminar"+_contexto,{id_proveedor:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
