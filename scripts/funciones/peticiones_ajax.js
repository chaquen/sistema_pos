function funPeticion(){
    
    var datos=JSON.stringify(this);//convierte a una cadena de texto
    //console.log(datos);
    this.respuestaServidor=$.ajax({
        url:"controlador/controlador_"+this.url+".php",
        data:{datos:datos},
        type:"post",
        dataType:'json'
    });
   // console.log(this.respuestaServidor);
   
}

