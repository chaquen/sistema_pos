/**
 * Variables globales con expresiones regulares
 * 
 * */
var rgxEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?: |com.es|com|com.co|net.co|co|org|net|biz|info|mobi|cat|es|ar|futbol|rocks|)$/i;
var rgxNumero=/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;

/**
 * url=//Ubicacion del archivo a consultar en la peticion HTTP
 * data= datos enviado en formato Json
 * type=tipo de metodo en este caso con el metodo POST
 * dataType=formato en que se recibe la informacion
 * */
/*funcion para consultar la hora del cliente*/
function horaCliente(){
    var anio= new Date();
    var mes= new Date();
    var dia=new Date();
    var hora=new Date(); 
    var minuto= new Date();
    var segundo= new Date();
    mes.getUTCMonth();
    var h=hora.getHours();
    if(h<=9){
        h="0"+h;
    }
    var minutos=minuto.getMinutes();
    if(minutos<=9){
        minutos="0"+minutos;
    }
    var segundos=segundo.getSeconds();
    if(segundos<=9){
        segundos="0"+segundos;
    }
    var ultActividad=anio.getFullYear()+"-"+(mes.getMonth()+1)+"-"+dia.getDate()+" "+h+":"+minutos+":"+segundos;
    return ultActividad;
    
}
/*Funcion para limpiar un formulario*/
function limpiarFormulario(idForm){
    var form=document.getElementById(idForm);
    for(var i in form.elements){
         
        if(form.elements[i].nodeName == "TEXTAREA"){
            form.elements[i].value="";  
        }
        //console.log(form.elements[i].type);
        //console.log(form.elements[i].checked);
        //console.log(form.elements[i].value);
        
        
        switch(form.elements[i].type){
            case "text":
                form.elements[i].value="";
                break;
            case "email":
                form.elements[i].value="";
                break;
            case "number":
                form.elements[i].value="";
                break;
            case "password":
                form.elements[i].value="";
                break;
            case "select-one":
                form.elements[i].value="0";
                break;
            case "checkbox":
                form.elements[i].checked=false;
                break;
            case "radio":
                form.elements[i].checked=false;
            break;
        }
    }
    console.log(form);
}
/*Funcion para agregar un evento a un elemento del objeto DOCUMENT*/
function agregarEvento(idElemento,evento,funcion){
    if(document.getElementById(idElemento)!=null){
        /*console.log("Nombre evento ");
        console.log(evento);
        console.log("Funcion ");
        console.log(funcion);*/
        document.getElementById(idElemento).addEventListener(evento,funcion,false);
         
        
        
        
    }else{
        console.log("Nombre evento ");
        console.log(evento);
        console.log("Funcion ");
        console.log(funcion);
        console.log("Elemento");
        console.log(idElemento);
        console.log("el elemento no existe");
    }
    
} 
/*Funcion para agregar una funcion al evento load del objeto WINDOW*/
function agregarEventoLoad(funcion){
    window.addEventListener("load",funcion,false);
    
}
/*Funcion para agregar una funcion al evento page show del objeto WINDOW*/
function agregarEventoPageShow(funcion){
    window.addEventListener("pageshow",funcion,false);
}

function redireccionar(url){
    location.href=url;
}
