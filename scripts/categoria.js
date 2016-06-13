agregarEventoLoad(iniciar_categoria);
function iniciar_categoria(){
    /**
     * INSERTAR 
     * */
    var miAjax=new miObjetoAjax("crear_categoria",{nombre_categoria:"Tres mas",descripcion_categoria :"dos mas"});
    miAjax.peticion_ajax();
    
    miAjax.respuestaServidor.success(function(rs){
        var r=devolverValoresServidorRegistro(rs);
        console.log(r.codigo);
        console.log(r.mensaje);
        console.log(r.respuesta);
        console.log(r.nuevo_registro);
    }).fail(function(){});
    
    
    /**
     * CONSULTAR
     * */
    var miAjax=new miObjetoAjax("consultar_categoria",{});
    miAjax.peticion_ajax();
    
    miAjax.respuestaServidor.success(function(rs){
        var r=devolverValoresServidorConsultar(rs);
        console.log(r.codigo);
        console.log(r.mensaje);
        console.log(r.respuesta);
        console.log(r.valores_consultados);
        console.log(r.tam);
        console.log(r.valores_consultados.length);
    }).fail(function(){});
    
    
}

