agregarEventoLoad(cargarFuncionesMenu);
var us;
function cargarFuncionesMenu(){
    
    
        us=obtener_session_storage("ssUsuario");
        if(us != false){
            $('#login').hide();
            $('.menuAdm').fadeIn('slow'); 

            agregarEvento("cat","click",iniciar_contexto_categoria);
            agregarEvento("prod","click",iniciar_contexto_producto);
            agregarEvento("prov","click",iniciar_contexto_proveedor);
            agregarEvento("entPed","click",iniciar_contexto_entrada_pedido);
            agregarEvento("entOt","click",iniciar_contexto_entrada_otros);
            agregarEvento("sal","click",iniciar_contexto_salida_otros);
            agregarEvento("fac","click",iniciar_contexto_factura);
            agregarEvento("usu","click",iniciar_contexto_usuario);
            agregarEvento("h3Salir","click",salirApp);
            consultar_menu_rol(us);

        }else{

            iniciarLogin();
            $('.menuAdm').hide();  

        }
    
    
    
    
    
    
}
function consultar_menu_rol(u){
    consultarDatos("consultarRol_usuario",{id_rol:u.id_rol},dibujar_menu);
    
    
}
function dibujar_menu(d){
    var dat=d.valores_consultados;
    for(var d in dat){
        console.log(dat[d]);
        if(dat[d].Crear==0){
            if(dat[d].IdCrear!=""){
                $("#"+dat[d].IdCrear).hide();
            }

        }

        if(dat[d].Consultar==0){
            if(dat[d].IdConsultar!=""){
                $("#"+dat[d].IdConsultar).hide();
            }
        }

        if(dat[d].Actualizar==0){
            if(dat[d].IdActualizar!=""){
                $("#"+dat[d].IdActualizar).hide();
            }

        }

        if(dat[d].Eliminar==0){
            if(dat[d].IdEliminar!=""){
                $("#"+dat[d].IdEliminar).hide();
            }

        }

    }
    
       
    
    
    
}