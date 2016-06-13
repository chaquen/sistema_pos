/*Funcion para consultar session storage*/
function obtener_session_storage(nombreSession){
    console.log(sessionStorage.ssUsuario);
    console.log(sessionStorage.getItem("ssUsuario"));
    console.log(sessionStorage["ssUsuario"]);
    if(sessionStorage[nombreSession]!=undefined){
       var sesion=JSON.parse(sessionStorage[nombreSession]);
       console.log(sesion);
       return sesion;
    }else{  
        return false;
    }
}