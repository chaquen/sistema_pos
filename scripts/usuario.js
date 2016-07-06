var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroUsuario;
var _btnConsultaUsuario;
var _btnBuscarEditarUsuario;
var _btnBuscarEliminarUsuario;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroUsuario;
var _formConsultaUsuario;
var _formActualizarUsuario;
var _formEliminarUsuario;


function iniciar_contexto_usuario(){
   
     _contexto="_usuario";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroUsuario='btnCrearUsuario';
     _btnConsultaUsuario='btnBusUsu';
     _btnBuscarEditarUsuario='btnEdicionUsu';
     _btnBuscarEliminarUsuario='btnEliminarUsu';
     
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroUsuario='formCrearUsuario';
     _formConsultaUsuario='formBuscarUsuario';
     _formActualizarUsuario='formEditarUsuario';
     _formEliminarUsuario='formEliminarUsuario';
    
    
   agregarEvento(_btnRegistroUsuario,"click",registrarContexto);
   agregarEvento(_btnConsultaUsuario,"click",consultarContextoUsuario);
   agregarEvento(_btnBuscarEditarUsuario,"click",consultarEditarContextoUsuario);
   agregarEvento(_btnBuscarEliminarUsuario,"click",consultarEliminarContextoUsuario);
   agregarEvento("pssClave","change",validar_clave);
   agregarEvento("pssValidarClave","change",validar_clave);
}

/* INSERTAR CONTEXTO*/    
function registrarContexto(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistroUsuario);   
    if(valores_formulario){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datosUsuario={
            nombre_usuario:valores_formulario.Texto[1],
            apellido_usuario:valores_formulario.Texto[2],
            documento_usuario:valores_formulario.Texto[0],
            telefono_usuario:'null',
            celular_usuario:'null',
            correo_usuario:valores_formulario.Texto[3],
            cargo_usuario:valores_formulario.Select[0],
            clave:valores_formulario.Clave,
            pregunta:'null',
            respuesta:'null'
        };
        //Invoco mi funcion 
        registrarDato("crear"+_contexto,datosUsuario,mostrarMensaje,"_formRegistroUsuario");
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoUsuario(){
    var valores_formulario=obtener_valores_formulario("formBuscarUsuario");
    if(valores_formulario!=false){
        consultarDatos("consultar"+_contexto,{nombre_usuario:valores_formulario.Texto[0]},dibujarConsultaUsuario);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores para buscar"});
    }    
}
function dibujarConsultaUsuario(datos){
    console.log(datos.valores_consultados);
    if(datos.valores_consultados!=undefined){
        $('#resBusquedaUsu').fadeIn('slow');
            var div=document.getElementById("resBusquedaUsu");
            div.innerHTML="";
            var tabla=document.createElement("table");
            var tbody=document.createElement("tbody");
            
            tabla.className="resultadoUsuario";
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Documento";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Nombre Usuario";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Cargo Usuario";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Email";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Salir";
            celda.className="salirRes";
            fila.appendChild(celda);
            tbody.appendChild(fila);
            
        for(var d in datos.valores_consultados){
            console.log(datos.valores_consultados[d]);
            
            
            if(datos.valores_consultados[d].EstadoUsuario==1){
                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","documento_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].DocumentoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","nombre_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].NombreUsuario+" "+datos.valores_consultados[d].ApellidoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","cargo_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].Cargo;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","email_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].CorreoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                fila.appendChild(celda);
                tbody.appendChild(fila);
            }            
        }
        tabla.appendChild(tbody);
        div.appendChild(tabla);
    }
    else{
       mostrarMensaje({mensaje:"No hay registros con estos parametros de busqueda"});
    }
}
/*EDITAR CONTEXTO*/
function consultarEditarContextoUsuario(){
    var valores_formulario=obtener_valores_formulario(_formActualizarUsuario);
    if(valores_formulario){
        console.log(valores_formulario);
        var datos={nombre_usuario:valores_formulario.Texto[0]};
        consultarDatos("consultar"+_contexto,datos,dibujarConsultaUsuarioEdicion);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}

function dibujarConsultaUsuarioEdicion(datos){
    console.log(datos.valores_consultados);
    if(datos.valores_consultados!=undefined){
        $('#resEdicionUsu').fadeIn('slow');
        var div=document.getElementById("resEdicionUsu");
        div.innerHTML="";
        var tabla=document.createElement("table");
        var tbody=document.createElement("tbody");
            
            tabla.className="resultadoUsuario";
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Documento";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Nombre Usuario";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Apellido Usuario";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Cargo Usuario";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Email";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Contraseña";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Confirmar Contraseña";
            fila.appendChild(celda);
            
            var celda=document.createElement("td");
            celda.innerHTML="Salir";
            celda.className="salirRes";
            fila.appendChild(celda);
            tbody.appendChild(fila);
            
        for(var d in datos.valores_consultados){
            console.log(datos.valores_consultados[d]);
            
            
            if(datos.valores_consultados[d].EstadoUsuario==1){
                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","documento_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].DocumentoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","nombre_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].NombreUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","apellido_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].ApellidoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","cargo_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].Cargo;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","email_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].CorreoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","password");
                inp.setAttribute("id","clave_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].Clave;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","password");
                inp.setAttribute("id","confirmar_clave_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].Clave;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","button");
                inp.setAttribute("value","Editar");
                inp.setAttribute("onclick","editarContextoUsuario('"+datos.valores_consultados[d].IdUsuario+"')");
                
                celda.appendChild(inp); 
                fila.appendChild(celda);
                tbody.appendChild(fila);
            }            
        }
        tabla.appendChild(tbody);
        div.appendChild(tabla);
    }
    else{
        mostrarMensaje({mensaje:"No hay registros con estos parametros de busqueda"});
    }
}
function editarContextoUsuario(id){
   var nombre=document.getElementById("nombre_usuario_"+id).value;
   var apellido=document.getElementById("apellido_usuario_"+id).value;
   var documento=document.getElementById("documento_"+id).value;
   var cargo=document.getElementById("cargo_usuario_"+id).value;
   var contraseña=document.getElementById("clave_usuario_"+id).value;   
   var confirmarcontraseña=document.getElementById("confirmar_clave_"+id).value;
   var email=document.getElementById("email_usuario_"+id).value;
    if(nombre != "" && apellido != "" && cargo != "0" && contraseña==confirmarcontraseña && email != ""){
        var datos={
        id_usuario:id,
        nombre_usuario:nombre,
        apellido_usuario:apellido,
        documento_usuario:documento,
        correo_usuario:email,
        clave:contraseña
    };
    
    editarDato("actualizar"+_contexto,datos,mostrarMensaje);
    
    }else{
        mostrarMensaje({mensaje:"Recuerda que la contraeña debe ser igual y ningun campo debe estar vacio"});
    }
}

/* ELIMINAR CONTEXTO*/
function consultarEliminarContextoUsuario(){
    var valores_formulario=obtener_valores_formulario(_formEliminarUsuario);
    if(valores_formulario){
        var datos={nombre_usuario:valores_formulario.Texto[0]};
       consultarDatos("consultar"+_contexto,datos,dibujarConsultaUsuarioEliminar);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function dibujarConsultaUsuarioEliminar(datos){
    console.log(datos.valores_consultados);
    if(datos.valores_consultados!=undefined){
        $('#resEliminarUsu').fadeIn('slow');
        var div=document.getElementById("resEliminarUsu");
        div.innerHTML="";
        var tabla=document.createElement("table");
        var tbody=document.createElement("tbody");
            
            tabla.className="resultadoUsuario";
            var fila=document.createElement("tr");
            var celda=document.createElement("td");
            celda.innerHTML="Documento";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Nombre Usuario";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Cargo Usuario";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Email";
            fila.appendChild(celda);
            var celda=document.createElement("td");
            celda.innerHTML="Salir";
            celda.className="salirRes";
            fila.appendChild(celda);
            tbody.appendChild(fila);
            
        for(var d in datos.valores_consultados){
            console.log(datos.valores_consultados[d]);
            
                var fila=document.createElement("tr");
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","documento_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].DocumentoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","nombre_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].NombreUsuario+" "+datos.valores_consultados[d].ApellidoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","cargo_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].Cargo;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("id","email_usuario_"+datos.valores_consultados[d].IdUsuario);
                inp.value=datos.valores_consultados[d].CorreoUsuario;
                celda.appendChild(inp); 
                fila.appendChild(celda);
                var celda=document.createElement("td");
                var inp=document.createElement("input");
                inp.setAttribute("type","button");
                if(datos.valores_consultados[d].EstadoUsuario==1){
                    inp.setAttribute("value","Deshabilitar");
                    inp.setAttribute("onclick","eliminarContextoUsuario('"+datos.valores_consultados[d].IdUsuario+"')");
                }else{
                    inp.setAttribute("value","Habilitar");
                    inp.setAttribute("onclick","habilitarContextoUsuario('"+datos.valores_consultados[d].IdUsuario+"')");
                }
                
                
               
                celda.appendChild(inp); 
                fila.appendChild(celda);
                tbody.appendChild(fila);
                        
        }
        tabla.appendChild(tbody);
        div.appendChild(tabla);
    }
    else{
        mostrarMensaje({mensaje:"No hay registros con estos parametros de busqueda"});
    }
}
function eliminarContextoUsuario(id){
    if(id!=undefined){
        eliminarDato("eliminar"+_contexto,{id_usuario:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
function habilitarContextoUsuario(id){
    if(id!=undefined){
        eliminarDato("habilitar"+_contexto,{id_usuario:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}

function validar_clave(){
    if(this.id=="pssClave" && document.getElementById("pssValidarClave").value!=""){
        if(!validar_igualdad_campos(this.id,"pssValidarClave")){
            mostrarMensaje({mensaje:"Las contraseñas son diferentes"});
        }
    }else if(document.getElementById("pssValidarClave").value!=""){
        if(!validar_igualdad_campos("pssClave",this.id)){
           mostrarMensaje({mensaje:"Las contraseñas son diferentes"});
        }
    }
    
    
    
}

function validar_igualdad_campos(v1,v2){
 if(document.getElementById(v1).value === document.getElementById(v2).value){
     return true;
 }       
 return false;
}