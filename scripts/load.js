agregarEventoLoad(cargarFuncionesMenu);

function cargarFuncionesMenu(){
    var s=obtener_session_storage("ssUsuario");
    if(s != false){
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
        
    }else{
      
        iniciarLogin();
        
    }
    
    
    
    
}