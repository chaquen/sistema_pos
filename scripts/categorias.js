var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistro;
var _btnConsulta;
var _btnActualizar;
var _btnSeleccionarActualizarCategoria;
var _btnBuscarCategoriaEliminar;
var _btnEliminar;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistro;
var _formConsulta;
var _formActualizar;
var _formEliminar;

//agregarEventoLoad(iniciar_contexto_categoria);
function iniciar_contexto_categoria(){
   
 _contexto="_categoria";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
  /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
 _btnRegistro="btnCrearCategoria";
 _btnConsulta="btnBusquedaCat";
 _btnActualizar="btnActualizarCategoria";
 _btnSeleccionarActualizarCategoria="btnEdicionCat";
 _btnBuscarCategoriaEliminar="btnEliminarCat";
 _btnEliminar="btnEliminarCategoria";
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
 _formRegistro="formCrearCategoria";
 _formConsulta="formConsultarCategoria";
 _formActualizar="formDatosEdicionCategoria";
 _formEliminar="formEliminarCategoria";
   
   
   agregarEvento(_btnRegistro,"click",registrarContextoCategoria);
   agregarEvento(_btnConsulta,"click",consultarContextoCategoria);
   agregarEvento(_btnActualizar,"click",editarContextoCategoria);
   //agregarEvento(_btnEliminar,"click",eliminarContexto);
   agregarEvento(_btnBuscarCategoriaEliminar,"click",buscarCategoriaEliminar);
   agregarEvento(_btnSeleccionarActualizarCategoria,"click",buscarCategoriaEditar);
   
   
}

/* INSERTAR CONTEXTO*/    
function registrarContextoCategoria(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistro);   
    if(valores_formulario){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={nombre_categoria:valores_formulario.Texto[0],descripcion_categoria:valores_formulario.Texto[1]};
        //Invoco mi funcion 
        registrarDato("crear"+_contexto,datos,mostrarMensaje,_formRegistro);     
        
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
/* CONSULTAR CONTEXTO */    
function consultarContextoCategoria(){
    
    consultarDatos("consultar"+_contexto,null,crearTablaCategoria);   
}
/*
function crearListaCategoria(datos){
    
    var lista=document.getElementById("ulListaRespuestaCategoria");
    if(lista!=null){
        for(var e in datos.valores_consultados){
            
            var li=document.createElement("li");
             var h3=document.createElement("h3");
            h3.innerHTML=datos.valores_consultados[e].NombreCategoriaProducto;
            li.appendChild(h3);
            lista.appendChild(li);
            
            var h3=document.createElement("h3");
            h3.innerHTML=datos.valores_consultados[e].DescripcionCategoriaProducto;
            li.appendChild(h3);
            lista.appendChild(li);
        }
    }else{
        mostrarMensaje({mensaje:"Por favor defina el elemento ulListaRespuesta"});
    }
}
*/
function crearTablaCategoria(datos){
    
    var div=document.getElementById("resBusCat");
    div.innerHTML="";
    var tabla=document.createElement("table");
    tabla.className="resultadoEdicionCat";
    if(datos.valores_consultados != undefined){
        $('#resBusCat').fadeIn('slow');
        var cuerpo=document.createElement("tbody");
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        celda.innerHTML="Nombre Categoria";        
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.innerHTML="Descripcion Categoría";
        fila.appendChild(celda);
         var celda=document.createElement("td");
        celda.innerHTML="Salir";
        celda.className="salirRes";
        fila.appendChild(celda);
        cuerpo.appendChild(fila);
        
        for(var e in datos.valores_consultados){
            
            if(datos.valores_consultados[e].EstadoCategoriaProducto==1){
                console.log(datos.valores_consultados[e]);
                var fila=document.createElement("tr");                
                var celda=document.createElement("td");
                celda.setAttribute("id","nombrecategoria_"+datos.valores_consultados[e].IdCategoriaProducto);
                celda.value=datos.valores_consultados[e].NombreCategoriaProducto;
                celda.innerHTML=datos.valores_consultados[e].NombreCategoriaProducto;
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                celda.setAttribute("id","descripcioncategoria_"+datos.valores_consultados[e].IdCategoriaProducto);
                celda.value=datos.valores_consultados[e].DescripcionCategoriaProducto;
                celda.innerHTML=datos.valores_consultados[e].DescripcionCategoriaProducto;
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                /*var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","descripcioncategoria_"+datos.valores_consultados[e].IdCategoriaProducto);
                inp.setAttribute("readonly",true);
                inp.value=datos.valores_consultados[e].DescripcionCategoriaProducto;
                celda.appendChild(inp); */
                fila.appendChild(celda);
                
                cuerpo.appendChild(fila);
                
         
            }
            tabla.appendChild(cuerpo);
            
        }
        div.appendChild(tabla);
    }
    else{
        mostrarMensaje({mensaje:"No hay registros con estos parametros de busqueda"});
    }
}
/*EDITAR CONTEXTO*/
function editarContextoCategoria(){
    var valores_formulario=obtener_valores_formulario(_formActualizar);
    if(valores_formulario){
        var datos={id:valores_formulario.Hidden[0],nombre_categoria:valores_formulario.Texto[0],descripcion_categoria:valores_formulario.Texto[1]};
        editarDato("actualizar"+_contexto,datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/*FUNCION PARA BUSCAR CATEGOIRAS A EDITAR*/
function buscarCategoriaEliminar(){
    
    var o={nombre:document.getElementById("txtNombreBuscarCategoriaEliminar").value};
    if(o.nombre!=""){
        consultarDatos("consultarpornombre"+_contexto,o,dibujarCategoriaEliminacion);
    }else{
        mostrarMensaje({mensaje:"por favor ingresa un valor para buscar"});
    }
    
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoCategoria(id){
      
    if(id!=undefined){
        eliminarDato("eliminar"+_contexto,{id_categoria:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function activarContextoCategoria(id){
      
    if(id!=undefined){
        eliminarDato("activar"+_contexto,{id_categoria:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function dibujarCategoriaEliminacion(datos){
    var div=document.getElementById("resEliminarCat");
    div.innerHTML="";
    var tabla=document.createElement("table");
    tabla.className="resultadoEdicionCat";
    if(datos!=null){
        $('#resEliminarCat').fadeIn('slow');
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        celda.innerHTML="Nombre Categoria";        
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.innerHTML="Descripcion Categoría";
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.className="salirRes";
        celda.innerHTML="Salir";
        fila.appendChild(celda);
        tabla.appendChild(fila);
        for(var e in datos.valores_consultados){
         console.log(datos.valores_consultados[e]);   
            
                var fila=document.createElement("tr");
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","nombrecategoria_"+datos.valores_consultados[e].IdCategoriaProducto);
                inp.value=datos.valores_consultados[e].NombreCategoriaProducto;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","descripcioncategoria_"+datos.valores_consultados[e].IdCategoriaProducto);
                inp.value=datos.valores_consultados[e].DescripcionCategoriaProducto;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var input=document.createElement("input");
                input.setAttribute("type","button");
                celda.appendChild(input);
                
                if(datos.valores_consultados[e].EstadoCategoriaProducto==1){
                    input.setAttribute("value","Deshabilitar");
                    input.setAttribute("onclick","eliminarContextoCategoria('"+datos.valores_consultados[e].IdCategoriaProducto+"');");
                
                }else{
                    input.setAttribute("value","activar");
                    input.setAttribute("onclick","activarContextoCategoria('"+datos.valores_consultados[e].IdCategoriaProducto+"');");
                
                }
                
                fila.appendChild(celda);
                tabla.appendChild(fila);
                
            
            
        }
           
     
        div.appendChild(tabla);
    }
}


/*FUNCION PARA BUSCAR CATEGOIRAS A EDITAR*/
function buscarCategoriaEditar(){
    
    var o={nombre:document.getElementById("txtNombreBuscarCategoria").value};
    if(o.nombre!=""){
        consultarDatos("consultarpornombre"+_contexto,o,dibujarTablaEditarCategoria);
    }else{
        mostrarMensaje({mensaje:"por favor ingresa un valor para buscar"});
    }
    
}
function dibujarTablaEditarCategoria(datos){
    var div=document.getElementById("resEdicionCat");
    div.innerHTML="";
    var tabla=document.createElement("table");
    tabla.className="resultadoEdicionCat";
    if(div!=null){
        $('#resEdicionCat').fadeIn('slow');
        var fila=document.createElement("tr");
        var celda=document.createElement("td");
        celda.innerHTML="Nombre Categoria";        
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.innerHTML="Descripcion Categoría";
        fila.appendChild(celda);
        var celda=document.createElement("td");
        celda.className="salirRes";
        celda.innerHTML="Salir";
        fila.appendChild(celda);
        tabla.appendChild(fila);
        for(var e in datos.valores_consultados){
         console.log(datos.valores_consultados[e]);   
            if(datos.valores_consultados[e].EstadoCategoriaProducto==1){
                var fila=document.createElement("tr");
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","nombrecategoria_"+datos.valores_consultados[e].IdCategoriaProducto);
                inp.value=datos.valores_consultados[e].NombreCategoriaProducto;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","descripcioncategoria_"+datos.valores_consultados[e].IdCategoriaProducto);
                inp.value=datos.valores_consultados[e].DescripcionCategoriaProducto;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var input=document.createElement("input");
                input.setAttribute("type","button");
                input.setAttribute("value","editar");
                //input.setAttribute("onclick","llenarDatosFormularioEditarCategoria('"+datos.valores_consultados[e].NombreCategoriaProducto+"','"+datos.valores_consultados[e].DescripcionCategoriaProducto+"','"+datos.valores_consultados[e].IdCategoriaProductoProducto+"');");
                input.setAttribute("onclick","editarContexto('"+datos.valores_consultados[e].IdCategoriaProducto+"');");
                celda.appendChild(input);
                
                
                fila.appendChild(celda);
                tabla.appendChild(fila);
                
            }
            
        }
        div.appendChild(tabla);
    }else{
        mostrarMensaje({mensaje:"Por favor defina el elemento divListaRespuestaCategoria"});
    }
}
function editarContexto(id){
    
    
    var nombre_categoria=document.getElementById("nombrecategoria_"+id);
    var descripcion_categoria=document.getElementById("descripcioncategoria_"+id);
    if(nombre_categoria != null && descripcion_categoria != null){
        var datos={
            id_categoria:id,
            nombre_categoria:nombre_categoria.value,
            descripcion_categoria:descripcion_categoria.value    

        };
    
        editarDato("actualizar"+_contexto,datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}