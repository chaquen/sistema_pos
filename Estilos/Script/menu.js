$(document).ready(function(){
       
    //Menu -----------------------------------
    
    $('li').click(function (){
        $('.subMenu').fadeOut('fast');
    });
    
    
    //Menu Usuarios
    $('#usu').mouseenter(function(){
        $('#subUsuario').fadeIn(500);
    });
    $('#subUsuario').mouseleave(function(){
        $('#subUsuario').fadeOut('fast');
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
    $('.salir, .salirEnt, .salirFact, .salirRes').click(function (){
        $('div').fadeOut('fast');
    });
    
    //Formularios de Usuarios
    //Crear Usaurio
    $('#crearUsu').click(function(){
        $('#formBusUsu, #formEdiUsu, #formEliUsu').fadeOut('fast');
        $('#formCrearUsu').toggle('puff');
    });
    //Buscar Usuario
    $('#buscarUsu').click(function(){
        $('#formCrearUsu, #formEdiUsu, #formEliUsu').fadeOut('fast');
        $('#formBusUsu').toggle('puff');
    });
    //Resultado Busqueda
    $('#btnBusUsu').click(function(){
        //$('#resBusquedaUsu').fadeIn('slow');
    });
    //Editar Usuario
    $('#editarUsu').click(function(){
        $('#formBusUsu, #formCrearUsu, #formEliUsu').fadeOut('fast');
        $('#formEdiUsu').toggle('puff');
    });
    //Resultado Edicion
    $('#btnEdicionUsu').click(function(){
        //$('#resEdicionUsu').fadeIn('slow');
    });
    //Eliminar Usuario
    $('#eliminarUsu').click(function(){
        $('#formBusUsu, #formEdiUsu, #formCrearUsu').fadeOut('fast');
        $('#formEliUsu').toggle('puff');
    });
    //Resultado Eliminar
    $('#btnEliminarUsu').click(function(){
        //$('#resEliminarUsu').fadeIn('slow');
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
    //Resultado Busqueda
    $('#btnBusquedaCat').click(function(){
        //$('#resBusCat').fadeIn('slow');
    });
    //Editar Categoria
    $('#ediCat').click(function(){
        $('#formBusCat, #formCrearCat, #formEliCat').fadeOut('fast');
        $('#formEdiCat').toggle('puff');
    });
    //Resultado Edicion
    $('#btnEdicionCat').click(function(){
        //$('#resEdicionCat').fadeIn('slow');
    });
    //Eliminar Categoria
    $('#eliCat').click(function(){
        $('#formBusCat, #formCrearCat, #formEdiCat').fadeOut('fast');
        $('#formEliCat').toggle('puff');
    });
    //Resultado Eliminar
    $('#btnEliminarCat').click(function(){
        //$('#resEliminarCat').fadeIn('slow');
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
    //Resultado Busqueda
    $('#btnBusquedaUsu').click(function(){
        
        //$('#resBusUsu').fadeIn('slow');
    });
    //Editar Productos
    $('#ediProd').click(function(){
        $('#formBusProd, #formCrearProd, #formEliProd').fadeOut('fast');
        $('#formEdiProd').toggle('puff');
    });
    //Resultado Edicion
    $('#busEdicionProd').click(function(){
        //$('#edicionProd').fadeIn('slow');
    });
    //Eliminar Productos
    $('#eliProd').click(function(){
        $('#formBusProd, #formEdiProd, #formCrearProd').fadeOut('fast');
        $('#formEliProd').toggle('puff');
    });
    //Resultado Eliminar
    $('#btnEliminarProd').click(function(){
        //$('#eliminarProd').fadeIn('slow');
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
    //Resultado Edicion
    $('#btnBuscarProv').click(function(){
        //$('#resBusProv').fadeIn('slow');
    });
    //Editar Proveedores
    $('#ediProv').click(function(){
        $('#formBusProv, #formCrearProv, #formEliProv').fadeOut('fast');
        $('#formEdiProv').toggle('puff');
    });
    //Resultado Edicion
    $('#btnBusEdicionProv').click(function(){
        //$('#resEdicionProv').fadeIn('slow');
    });
    //Eliminar Proveedores
    $('#eliProv').click(function(){
        $('#formBusProv, #formEdiProv, #formCrearProv').fadeOut('fast');
        $('#formEliProv').toggle('puff');
    });
    //Rresultado eliminar
    $('#btnEliminarProv').click(function(){
        //$('#resEliminarProv').fadeIn('slow');
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
    
    //Formulario de la Factura
    $('#fac').click(function(){
        $('#formFactura').fadeIn('slow');
    });
    
});