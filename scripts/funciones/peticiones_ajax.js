function funPeticion(){
    var datos=JSON.stringify(this);
    //console.log(datos);
    this.respuestaServidor=$.ajax({
        url:"controlador/controlador_"+this.url+".php",
        data:{datos:datos},
        type:"post",
        dataType:'json'
    });
   // console.log(this.respuestaServidor);
   
}
