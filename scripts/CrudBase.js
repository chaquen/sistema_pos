/* INSERTAR DATOS
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructura que voy a  enviaren la peticion HTTP
 * {funcion_depues} funcion que se realizara despues de recibir la respuesta del servidor
 * */    
function registrarDato(evento_server,datos,funcion_despues,form){
    
    
    if(datos){
        var miAjax=new miObjetoAjax(evento_server,datos);
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
            if(r.respuesta){
                if(form!=undefined){
                    limpiarFormulario(form);
                }
                 
                 funcion_despues(r);
            }else{
                mostrarMensaje({mensaje:r.mensaje});
            }
            
        }).fail(function(){});
    
    }else{
        alert("por favor ingresa valores");
    }
   
}
/* CONSULTAR DATOS 
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor*/    
function consultarDatos(evento_server,datos,funcion_despues){
    
    var miAjax=new miObjetoAjax(evento_server,datos);
    miAjax.peticion_ajax();
    
    miAjax.respuestaServidor.success(function(rs){
        var r=devolverValoresServidorConsultar(rs);
        console.log(r.codigo);
        console.log(r.mensaje);
        console.log(r.respuesta);
        console.log(r.valores_consultados);
        //console.log(r.tam);
        //console.log(r.valores_consultados.length);
        funcion_despues(r);
    }).fail(function(){});
    
    
}
/*EDITAR DATOS
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor
 * */
function editarDato(evento_server,datos,funcion_despues){
    console.log(datos);
    if(datos){
        
        var miAjax=new miObjetoAjax(evento_server,datos);
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
            funcion_despues(r);
        }).fail(function(){});
    
    }else{
        alert("por favor ingrese los valores requeridos");
    }
}
/* ELIMINAR DATOS
 * {evento_servidor} string que indica la operacion que va a realizar en el servidor
 * {datos} objeto con la estructira que voy a  enviaren la peticion HTTP
 * {funcion_depues} funccion que se realizara despues de recibir la respuesta del servidor
 *  * 
 * */
function eliminarDato(evento_server,datos,funcion_despues){
    
    if(datos){
        var miAjax=new miObjetoAjax(evento_server,datos);
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
            if(r.respuesta){
                funcion_despues(r);
            }else{
                mostrarMensaje("No hemos podido eliminar el dato");
            }
            
        }).fail(function(){});
    
    }else{
        alert("por favor ingrese los valores requeridos");
    }
}