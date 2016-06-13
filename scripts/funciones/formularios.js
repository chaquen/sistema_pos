/*Funcion que devuelve un arreglo con los valores del formulario*/
function obtener_valores_formulario(idFormulario){
    
    var formulario=document.getElementById(idFormulario);
    
    if(formulario!=null){       
        var elementos=formulario.elements;
        var arregloElementos={};
        var tam=Object.keys(elementos).length;
        var txt=[];
        var sel=[];
        var chbox=[];
        var rd=[];
        var hd=[];
        var otros=[];
        var fecha=[];
        var correo=[];
        var archivo=[];        
        var clave;
        
        for(var i=0; i<=tam-1 ;i++){
            
          console.log(elementos[i]);
          if(elementos[i] != undefined){
              console.log(elementos[i]);
              if( elementos[i].type != "button" && elementos[i].required && elementos[i].value==""){
                 elementos[i].style.borderColor="red";
                 return false;
                 break;
              }
                console.log(elementos[i].type);
                console.log(elementos[i].value);
                if(validar_campo_formulario(elementos[i],elementos[i].name)){
                    elementos[i].style.borderColor="";
                        switch(elementos[i].type){
                            case "text":
                                txt.push(elementos[i].value);
                                break;
                            case "select-one":
                                console.log(elementos[i].value);

                                  if(elementos[i].value!="0"){
                                      sel.push(elementos[i].value);
                                  }else{
                                      elementos[i].style.borderColor="red";
                                      return false;
                                      break;
                                  }
                                break;
                             case "button":
                                //console.log("SOY UN BOTTON");
                                break;   
                             case "checkbox":
                                if(elementos[i].checked==true){
                                    chbox.push(elementos[i].value);
                                } 
                                break;   
                            case "radio" :
                                if(elementos[i].checked==true){
                                    rd.push(elementos[i].value);
                                } 
                              break;
                          case "hidden":
                              if(elementos[i].value!=""){
                                  hd.push(elementos[i].value);
                              }else{
                                  hd.push("0");
                              }

                              break;
                          case "date":
                             fecha.push(elementos[i].value);
                              break;
                          case "email":

                              correo.push(elementos[i].value);


                              break;
                          case "file":

                              var nombreArchivo=elementos[i].value.split("\\");
                              //console.log(elementos[i].value.split('\\'));
                              //archivo.push(nombreArchivo[2]);
                              archivo.push(elementos[i].files);
                              break;
                          case "password":
                              clave=elementos[i].value;
                              break;
                          case "image":
                              break;

                          default:
                              otros.push(elementos[i].value);
                              break;
                        }
                }else{
                     elementos[i].style.borderColor="red";
                     return false;
                     break;
                }
                
              
          }          
            
        }
        arregloElementos.Texto=txt;
        arregloElementos.Select=sel;
        arregloElementos.Checkbox=chbox;
        arregloElementos.Radio=rd;
        arregloElementos.Hidden=hd;
        arregloElementos.Otros=otros;
        arregloElementos.Email=correo;
        arregloElementos.Fecha=fecha;
        arregloElementos.Archivo=archivo;
        arregloElementos.Clave=clave;
        //console.log("ELEMENTOS DEL ARREGLO");
        console.log(arregloElementos);
        return arregloElementos;
    }
    else{
        console.log(formulario);
        return false;
    }
}
function validar_campo_formulario(e,name){
    
    switch(name){
        case "letras":
                return true;
            if(rgxLetras.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        case "numeros":
            if(rgxNumero.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        case "correo":
            if(rgxEmail.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        default:
            return true;
        break;
    }
}
function agregar_session_storage(nombreSession,valor){
    sessionStorage.setItem("ssUsuario",JSON.stringify(valor));
    
 }
 function eliminar_session_storage(){
    sessionStorage.clear();
}
