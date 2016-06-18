$(document).ready(function(){
       
    //Menu -----------------------------------
    $('#btnIngresar').click(function(){
        $('#login').fadeOut('fast');
        $('.menuAdm').fadeIn('slow');
    });
    $('li').click(function (){
        $('.subMenu').fadeOut('fast');
    });
    
    //Menu categorias
    $('#cat').mouseenter(function(){
        $('#subCategoria').fadeIn(500);
    });
    $('#subCategoria').mouseleave(function(){
        $('#subCategoria').fadeOut('fast');
    });
    //Menu Productos
    $('#prod').mouseenter(function(){
        $('#subProducto').fadeIn(500);
    });
    $('#subProducto').mouseleave(function(){
        $('#subProducto').fadeOut('fast');
    });
    //Menu Proveedores
    $('#prov').mouseenter(function(){
        $('#subProveedor').fadeIn(500);
    });
    $('#subProveedor').mouseleave(function(){
        $('#subProveedor').fadeOut('fast');
    });
    //Menu Entradas
    $('#ent').mouseenter(function(){
        $('#subEntrada').fadeIn(500);
    });
    $('#subEntrada').mouseleave(function(){
        $('#subEntrada').fadeOut('fast');
    });
    
    //Formularios ----------------------------
    
    //Salir de los formularios
    $('.salir').click(function (){
        $('div').fadeOut('fast');
    });
    //Salir formularios entrada
    $('.salirEnt').click(function (){
        $('div').fadeOut('fast');
    });    
    
    //Formularios de Categoria
    //Crear Categoria
    $('#crearCat').click(function(){
        $('#formBusCat, #formEdiCat, #formEliCat').fadeOut('fast');
        $('#formCrearCat').toggle('puff');
    });
    //Buscar Categoria
    $('#busCat').click(function(){
        $('#formCrearCat, #formEdiCat, #formEliCat').fadeOut('fast');
        $('#formBusCat').toggle('puff');
    });
    //Editar Categoria
    $('#ediCat').click(function(){
        $('#formBusCat, #formCrearCat, #formEliCat').fadeOut('fast');
        $('#formEdiCat').toggle('puff');
    });
    //Eliminar Categoria
    $('#eliCat').click(function(){
        $('#formBusCat, #formCrearCat, #formEdiCat').fadeOut('fast');
        $('#formEliCat').toggle('puff');
    });
    
    //Formularios de Productos
    //Crear Productos
    $('#crearProd').click(function(){
        $('#formBusProd, #formEdiProd, #formEliProd').fadeOut('fast');
        $('#formCrearProd').toggle('puff');
    });
    //Buscar Producto
    $('#busProd').click(function(){
        $('#formCrearProd, #formEdiProd, #formEliProd').fadeOut('fast');
        $('#formBusProd').toggle('puff');
    });
    //Editar Productos
    $('#ediProd').click(function(){
        $('#formBusProd, #formCrearProd, #formEliProd').fadeOut('fast');
        $('#formEdiProd').toggle('puff');
    });
    //Eliminar Productos
    $('#eliProd').click(function(){
        $('#formBusProd, #formEdiProd, #formCrearProd').fadeOut('fast');
        $('#formEliProd').toggle('puff');
    });
    
    //Formularios de Proveedores
    //Crear Proveedores
    $('#crearProv').click(function(){
        $('#formBusProv, #formEdiProv, #formEliProv').fadeOut('fast');
        $('#formCrearProv').toggle('puff');
    });
    //Buscar Proveedores
    $('#busProv').click(function(){
        $('#formcrearProv, #formEdiProv, #formEliProv').fadeOut('fast');
        $('#formBusProv').toggle('puff');
    });
    //Editar Proveedores
    $('#ediProv').click(function(){
        $('#formBusProv, #formCrearProv, #formEliProv').fadeOut('fast');
        $('#formEdiProv').toggle('puff');
    });
    //Eliminar Proveedores
    $('#eliProv').click(function(){
        $('#formBusProv, #formEdiProv, #formCrearProv').fadeOut('fast');
        $('#formEliProv').toggle('puff');
    });
    
    //Formularios Entrada de mercancia
    $('#entPed').click(function(){
        $('#formEntOt').fadeOut('fast');
        $('#formEntPed').toggle('puff');
    });
    $('#entOt').click(function(){
        $('#formEntPed').fadeOut('fast');
        $('#formEntOt').toggle('puff');
    });
    
    //Formulario para la salida de mercancia
    $('#sal').click(function(){
        $('#formSal').fadeIn('slow');
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});