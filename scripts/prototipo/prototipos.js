function miObjetoAjax(operacion,datos){
    this.operacion=operacion.split("_")[0];
    this.datos=datos;
    this.url=operacion.split("_")[1];
    this.respuestaServidor;
    this.peticion_ajax=funPeticion;
    this.hora_cliente=horaCliente();
}
