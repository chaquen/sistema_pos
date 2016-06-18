agregarEventoLoad(iniciar_categoria);
function iniciar_categoria(){
   //agregarEvento("btnCrearCategoria","click",registrarCategoriaOld);
   agregarEvento("btnCrearCategoria","click",registrarCategoria);
   consultarCategoria();         
}

/* INSERTAR CATEGORIA*/    
function registrarCategoria(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario("formCategoria");   
    if(valores_formulario){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={nombre_categoria:valores_formulario.Texto[0],descripcion_categoria :valores_formulario.Texto[1]};
        //Invoco mi funcion 
        registrarDato("crear_categoria",datos,imprimir);
    }else{
       alert("por favor ingresa valores");
    }
    
    

}
function imprimir(datos){
    console.log(datos);
}
/* CONSULTAR CATEGORIA */    
function consultarCategoria(){
    consultarDatos("consultar_categoria",null,imprimir);   
}
/*EDITAR CATEGORIA*/
function editarCategoria(){
    
    
    
    var valores_formulario=obtener_valores_formulario("aquiElIdDeSuFormulario");
    
    
    
    if(valores_formulario){
        var datos={id_categoria:valores_formulario.Hidden[0],nombre_categoria:valores_formulario.Texto[0],descripcion_categoria :valores_formulario.Texto[1]};
        editarDato("actualizar_categoria",datos,imprimir);
        
    
    }else{
        alert("por favor ingrese los valores requeridos");
    }
}
/* ELIMINAR CATEGORIA*/
function eliminarCategoria(){
    var valores_formulario=obtener_valores_formulario("aquiElIdDeSuFormulario");
    if(valores_formulario){
        eliminarDato("eliminar_categoria",{id_categoria:valores_formulario.Hidden[0]},imprimir);
       
    }else{
        alert("por favor ingrese los valores requeridos");
    }
}
/*============================================================================================================================0*/
/**EVENTO VIEJOS*/
/* INSERTAR CATEGORIA*/    
function registrarCategoriaOld(evento){
    
    evento.preventDefault();
    var valores_formulario=obtener_valores_formulario("formCategoria");
    
    if(valores_formulario){
        var miAjax=new miObjetoAjax("crear_categoria",{nombre_categoria:valores_formulario.Texto[0],descripcion_categoria :valores_formulario.Texto[1]});
        miAjax.peticion_ajax();

        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
        }).fail(function(){});
    
    }else{
        alert("por favor ingrese los valores requeridos");
    }
}
/* CONSULTAR CATEGORIA */    
function consultarCategoriaOld(){
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
/*EDITAR CATEGORIA*/
function editarCategoriaOld(){
    var valores_formulario=obtener_valores_formulario("aquiElIdDeSuFormulario");
    if(valores_formulario){
        var miAjax=new miObjetoAjax("actualizar_categoria",{id_categoria:valores_formulario.Hidden[0],nombre_categoria:valores_formulario.Texto[0],descripcion_categoria :valores_formulario.Texto[1]});
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
        }).fail(function(){});
    
    }else{
        alert("por favor ingrese los valores requeridos");
    }
}
/* ELIMINAR CATEGORIA*/
function eliminarCategoriaOld(){
    var valores_formulario=obtener_valores_formulario("aquiElIdDeSuFormulario");
    if(valores_formulario){
        var miAjax=new miObjetoAjax("eliminar_categoria",{id_categoria:valores_formulario.Hidden[0]});
        miAjax.peticion_ajax();
        miAjax.respuestaServidor.success(function(rs){
            var r=devolverValoresServidorRegistro(rs);
            console.log(r.codigo);
            console.log(r.mensaje);
            console.log(r.respuesta);
            console.log(r.nuevo_registro);
        }).fail(function(){});
    
    }else{
        alert("por favor ingrese los valores requeridos");
    }
}