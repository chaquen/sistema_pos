agregarEventoLoad(cargarFuncionesMenu);
function cargarFuncionesMenu(){
    agregarEvento("cat","click",iniciar_contexto_categoria);
    agregarEvento("prod","click",iniciar_contexto_producto);
    agregarEvento("prov","click",iniciar_contexto_proveedor);
    agregarEvento("ent","click",iniciar_contexto_entrada);
    
}