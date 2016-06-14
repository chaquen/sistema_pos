<?php
include '../datos/orm_categoria.php';
$c=new Categoria();
//INSERTAR
echo "INSERTAR<br>";
$c->valor_nombre_categoria='kareculito';
$c->valor_descripcion_categoria='Una breve descripcion1';
var_dump($c->crear_registro());
echo "<br>";
//ACTUALIZAR
echo "ACTUALIZAR<br>";
$c->valor_id_categoria='1';
$c->valor_nombre_categoria='La Primera';
$c->valor_descripcion_categoria='Una breve descripcion1';
var_dump($c->actualizar_recurso());
echo "<br>";
//ELIMINAR
echo "ELIMINAR<br>";
$c->valor_id_categoria='6';
var_dump($c->eliminar_registro());
echo "<br>";
//CONSULTAR
echo "CONSULTAR TODOS<br>";
$c->obtener_registro_todos_los_registros();
var_dump($c->filas_json);
echo "<br>";
