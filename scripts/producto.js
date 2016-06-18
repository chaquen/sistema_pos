var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistro;
var _btnConsulta;
var _btnActualizar;
var _btnEdicionProd;
var _btnBuscarElimnarProducto ;
var _btnEliminar;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistro;
var _formConsulta;
var _formBuscarEdicionProducto;
var _formBuscarEliminarProducto;
var _formActualizar;
var _formEliminar;
var cat;

function iniciar_contexto_producto(){
   
     _contexto="_producto";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistro="btnCrearProducto";
     _btnConsulta="btnBuscarProducto";
     _btnActualizar;
     _btnEdicionProd="busEdicionProd";
     _btnBuscarElimnarProducto ="btnBuscarElimnarProducto";
     _btnEliminar;
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistro="formCrearProducto";
     _formConsulta;
     _formBuscarEdicionProducto="formBuscarEdicionProducto";
     _formBuscarEliminarProducto="formBuscarEliminarProducto";
     _formActualizar;
     _formEliminar;
    
    
   agregarEvento(_btnRegistro,"click",registrarContextoProducto);
   agregarEvento(_btnConsulta,"click",consultarContextoProducto);
   //agregarEvento(_btnActualizar,"click",editarContextoProducto);
   //agregarEvento(_btnActualizar,"click",eliminarContextoProducto);
   agregarEvento(_btnEdicionProd,"click",buscarProductoEdicion);
   agregarEvento(_btnBuscarElimnarProducto,"click",buscarProductoEliminar);
   consultarCategoria();
}

/* INSERTAR CONTEXTO*/    
function registrarContextoProducto(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistro);   
    if(valores_formulario){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={nombre_producto:valores_formulario.Texto[1],codigo_producto:valores_formulario.Texto[0],descripcion_producto:valores_formulario.Texto[2],id_categoria:valores_formulario.Select[0],valor_producto:valores_formulario.Texto[3]};
        //Invoco mi funcion 
        registrarDato("crear"+_contexto,datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoProducto(){
    
    consultarDatos("consultar"+_contexto,{},dibujarProductosConsulta);   
}
function dibujarProductosConsulta(datos){
    console.log(datos);
    if(datos.valores_consultados!=undefined){
        var div=document.getElementById("divListaProductos");
        div.innerHTML="";
        var tabla=document.createElement("table");
        tabla.className="resultadoProd";
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Categoría";
            var celda=document.createElement("td");
            celda.innerHTML="Código";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre Producto";
            var celda=document.createElement("td");
            celda.innerHTML="Descripción";
            var celda=document.createElement("td");
            celda.innerHTML="Valor";
            var celda=document.createElement("td");
            celda.className="salirRes";
            celda.innerHTML="Salir";
            
        for(var d in datos.valores_consultados){
            console.log(datos.valores_consultados[d]);
            
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var select=document.createElement("select");
            for(var c in cat){
                var op=document.createElement("option");
                op.innerHTML=cat[c].NombreCategoriaProducto;
                op.value=cat[c].IdCategoriaProducto;
                if(cat[c].IdCategoriaProducto==datos.valores_consultados[d].Fk_Id_Categoria){
                    op.setAttribute("selected",true);
                }
                select.appendChild(op);
            }
            select.setAttribute("id","categoria_"+datos.valores_consultados[d].IdProducto);
            celda.appendChild(select);
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","codigo_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].CodigoProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombre_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].NombreProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","descripcion_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].DescripcionProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","precio_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].PrecioVentaDefinitivo;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            
            tabla.appendChild(fila);
        }
        div.appendChild(tabla);
    }
}
/*EDITAR CONTEXTO*/

function buscarProductoEdicion(){
    
    var d={codigo:document.getElementById("txtCodigoBarraEdicion").value};
    if(d.codigo!=""){
        consultarDatos("consultarporcodigo"+_contexto,d,dibujarProductosEdicion);   
    }else{
        mostrarMensaje({mensaje:"por favor ingrese valores para consultar"});
    }
    
}
function dibujarProductosEdicion(datos){
    if(datos.valores_consultados!=undefined){
        var div=document.getElementById("edicionProd");
        div.innerHTML="";
        var tabla=document.createElement("table");
        tabla.className="resultadoProd";
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Categoría";
            var celda=document.createElement("td");
            celda.innerHTML="Código";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre Producto";
            var celda=document.createElement("td");
            celda.innerHTML="Descripción";
            var celda=document.createElement("td");
            celda.innerHTML="Valor";
            var celda=document.createElement("td");
            celda.className="salirRes";
            celda.innerHTML="Salir";
            
        for(var d in datos.valores_consultados){
            console.log(datos.valores_consultados[d]);
            
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var select=document.createElement("select");
            for(var c in cat){
                var op=document.createElement("option");
                op.innerHTML=cat[c].NombreCategoriaProducto;
                op.value=cat[c].IdCategoriaProducto;
                if(cat[c].IdCategoriaProducto==datos.valores_consultados[d].Fk_Id_Categoria){
                    op.setAttribute("selected",true);
                }
                select.appendChild(op);
            }
            select.setAttribute("id","categoria_"+datos.valores_consultados[d].IdProducto);
            celda.appendChild(select);
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","codigo_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].CodigoProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombre_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].NombreProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","descripcion_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].DescripcionProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","precio_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].PrecioVentaDefinitivo;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","button");
            inp.setAttribute("value","Editar");
            inp.setAttribute("onclick","editarContextoProducto('"+datos.valores_consultados[d].IdProducto+"')");
            celda.appendChild(inp); 
            fila.appendChild(celda);
            fila.setAttribute("id",""+datos.valores_consultados[d].IdProducto)
            tabla.appendChild(fila);
        }
        div.appendChild(tabla);
    }
}
function editarContextoProducto(id){
    
    var categoria=document.getElementById("categoria_"+id).value;
    var codigo=document.getElementById("codigo_"+id).value;
    var nombre=document.getElementById("nombre_"+id).value;
    var descripcion=document.getElementById("descripcion_"+id).value;
    var precio=document.getElementById("precio_"+id).value;
    var datos={
        id_producto:id,
        nombre_producto:nombre,
        codigo_producto:codigo,
        descripcion_producto:descripcion,
        id_categoria:categoria,
        precio:precio
        
    };
    
    if((categoria != "") && (codigo != "") && (nombre != "") &&  (descripcion != "") && (precio != "")){
        
        editarDato("actualizar"+_contexto,datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/


function buscarProductoEliminar(){
    
    var d={codigo:document.getElementById("txtBuscarEliminarProducto").value};
    if(d.codigo!=""){
        consultarDatos("consultarporcodigo"+_contexto,d,dibujarProductosEliminar);   
    }else{
        mostrarMensaje({mensaje:"por favor ingrese valores para consultar"});
    }
    
}
function dibujarProductosEliminar(datos){
    if(datos.valores_consultados!=undefined){
        var div=document.getElementById("eliminarProd");
        div.innerHTML="";
        var tabla=document.createElement("table");
        tabla.className="resultadoProd";
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Categoría";
            var celda=document.createElement("td");
            celda.innerHTML="Código";
            var celda=document.createElement("td");
            celda.innerHTML="Nombre Producto";
            var celda=document.createElement("td");
            celda.innerHTML="Descripción";
            var celda=document.createElement("td");
            celda.innerHTML="Valor";
            var celda=document.createElement("td");
            celda.className="salirRes"
            celda.innerHTML="Salir";
            
        for(var d in datos.valores_consultados){
            console.log(datos.valores_consultados[d]);
            
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            var select=document.createElement("select");
            for(var c in cat){
                var op=document.createElement("option");
                op.innerHTML=cat[c].NombreCategoriaProducto;
                op.value=cat[c].IdCategoriaProducto;
                if(cat[c].IdCategoriaProducto==datos.valores_consultados[d].Fk_Id_Categoria){
                    op.setAttribute("selected",true);
                }
                select.appendChild(op);
            }
            select.setAttribute("id","categoria_"+datos.valores_consultados[d].IdProducto);
            celda.appendChild(select);
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","codigo_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].CodigoProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","nombre_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].NombreProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","descripcion_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].DescripcionProducto;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("id","precio_"+datos.valores_consultados[d].IdProducto);
            inp.value=datos.valores_consultados[d].PrecioVentaDefinitivo;
            celda.appendChild(inp); 
            fila.appendChild(celda);
            var celda=document.createElement("td");
            var inp=document.createElement("input");
            inp.setAttribute("type","button");
            inp.setAttribute("value","Eliminar");
            inp.setAttribute("onclick","eliminarContextoProducto('"+datos.valores_consultados[d].IdProducto+"')");
            celda.appendChild(inp); 
            fila.appendChild(celda);
            fila.setAttribute("id",""+datos.valores_consultados[d].IdProducto)
            tabla.appendChild(fila);
        }
        div.appendChild(tabla);
    }
}
function eliminarContextoProducto(id){
    
    if(id!=undefined){
        eliminarDato("eliminar"+_contexto,{id_producto:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function consultarCategoria(){
    consultarDatos("consultar_categoria",null,crearSelectCategoria);   
}

function crearSelectCategoria(datos){
    var select=document.getElementById("selCategoriaProducto");
    
    select.innerHTML="";
    
    var option = document.createElement("option");
    option.value="0";
    option.innerHTML="--Seleccione una categoria--";
     select.appendChild(option);
    cat=datos.valores_consultados;
    for(var i in datos.valores_consultados){
        //console.log(datos.valores_consultados[i]);
        if(datos.valores_consultados[i].EstadoCategoriaProducto==1){
            var option = document.createElement("option");
    
            option.value=datos.valores_consultados[i].IdCategoriaProducto;
            option.innerHTML=datos.valores_consultados[i].NombreCategoriaProducto;
            option.style.background="";
            select.appendChild(option);
    
        }
        
    }
}