
var _contexto="_usuario";
function iniciarLogin(){
    agregarEvento("btnIngresar","click",Ingresar);
    
    
}

/*Fncion para ingresar*/
function Ingresar (){
    var dat=obtener_valores_formulario("formIngreso");
    if(dat!=false){
        consultarDatos("ingreso"+_contexto,{user_name:dat.Texto[0],clave:dat.Clave},validarIngreso);
        limpiarFormulario("formIngreso");
    }else{
        mostrarMensaje({mensaje:"Por favor ingresa los campos requeridos"});
    }
    
 
    
    //obtenerMiEquipo(us);
    
    
}
function validarIngreso(datos){
    console.log(datos);
    
       
        if(datos.respuesta){
            if(datos.valores_consultados!=undefined){
                var d=datos.valores_consultados[0];
                var us={};
                us.nombre=d.NombreUsuario+" "+d.ApellidoUsuario;
                us.correo=d.CorreoUsuario;
                us.id_usuario=d.IdUsuario;
                us.id_rol=d.Cargo;
                agregar_session_storage("ssUsuario",us);
                recargar();
                
                
            }
            
        }else{
            mostrarMensaje(datos);
        }
    
}
/*Funcion para salir de la aplicacion*/
function salirApp(){
    if(confirm("Desea salir de la aplicación?")){
        var us=obtener_session_storage("ssUsuario");
        
        registrarDato("cerrarSesion"+_contexto,{id_user:us.id_usuario},validarSalidaApp);
        
    }
    
}
function validarSalidaApp(datos){
    if(datos.respuesta){
        sessionStorage.clear();
        location.reload(true);
        //location.href="ingresar.html";       
        console.log(window);
    }else{
        mostrarMensaje(datos);
    }
}
function recargar(){
    location.reload(true);
}
