/*Fncion para ingresar*/
function Ingresar (datos){
    
    var us={};
    var usr=new usuario("ingresarApp",datos);
    usr.funPeticionAjax();
    usr.respuestaServidor.success(function(respuestaServidor){
       
        if(respuestaServidor.respuesta){
            var dt=eval(respuestaServidor.datosRespuesta);
            
            var h=horaCliente();
            console.log(dt);
            var perfil=eval(dt.perfil);
            console.log(perfil);
            if(dt.equipo==null){
                var equipo=eval(dt.equipo);
                console.log(equipo);
                us={
                    idUsuario:perfil[0].IdMiembro,
                    nombreUsuario:perfil[0].NombresMiembro,
                    cedula:perfil[0].Documento,
                    celular:perfil[0].Celular,
                    telefono:perfil[0].Telefono,
                    rol:perfil[0].Fk_Id_Rol,
                    nombreRol:perfil[0].NombreRolAplicacion,
                    correo:perfil[0].Email,
                    fechaNacimiento:perfil[0].FechaNacimiento,
                    horaIngreso:h,
                    eventos:false,
                    equipo:false,
                    categoria_equipo:false,
                    token:perfil[0].Token_Ingreso
                };
            }else{
                var equipo=eval(dt.equipo);
                console.log(equipo);
                us={
                    idUsuario:perfil[0].IdMiembro,
                    nombreUsuario:perfil[0].NombresMiembro,
                    cedula:perfil[0].Documento,
                    celular:perfil[0].Celular,
                    telefono:perfil[0].Telefono,
                    rol:perfil[0].Fk_Id_Rol,
                    nombreRol:perfil[0].NombreRolAplicacion,
                    correo:perfil[0].Email,
                    fechaNacimiento:perfil[0].FechaNacimiento,
                    horaIngreso:h,
                    eventos:false,
                    equipo:equipo[0].Fk_Id_Equipo,
                    categoria_equipo:equipo[0].Fk_Id_Categoria_Equipo,
                    token:perfil[0].Token_Ingreso
                };
            }
            
            console.log(us);          
            
                //agrego los eventos de acuerdo al rango
            
            
            
            agregar_session_storage("ssUsuario",JSON.stringify(us));
            recargar();
            
            
            
        }else{
            
            mostrarMensaje(respuestaServidor.mensaje);
            
        }
        
    }).fail(function(){});
    
    //obtenerMiEquipo(us);
    
    
}
/*Funcion para salir de la aplicacion*/
function salirApp(){
    if(confirm("Desea salir de la aplicación?")){
        var us=JSON.parse(obtener_session_storage("ssUsuario"));
        document.getElementById("formIngresar").style.display='block';
        document.getElementById("infoUsuario").style.display='none';
        var us=new usuario("cerrarSesion",us.idUsuario);
        us.funPeticionAjax();
        us.respuestaServidor.success(function(rs){
         alert(rs.mensaje);    
        }).fail(function(){});
        sessionStorage.clear();
        location.reload(true);
        //location.href="ingresar.html";       
        console.log(window);
        //this.close();
    }
    
}
