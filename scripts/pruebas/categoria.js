agregarEventoLoad(iniciar_categoria);
function iniciar_categoria(){
   
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
