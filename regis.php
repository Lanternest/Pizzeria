<?php
include_once('db.php');

$conectar= conn(); //ejecuta las conexiones con db

//recibe los datos
$nombres =mysql_real_escape_string($conectar, $_POST ['nombres']);
$apellidos =mysql_real_escape_string($conectar, $_POST ['apellidos']);
$telefono =mysql_real_escape_string($conectar, $_POST ['telefono']);
$direccion =mysql_real_escape_string($conectar, $_POST ['direccion']);
$contraseña =mysql_hash($POST['contraseña'],PASSWORD_DEFAULT);


if(empty($nombres) || empty($apellido) || empty($areadetrabajo) || empty($usuario)||empty($contraseña) ){
    die("Falta datos por completar");

}


$sql="INSERT INTO usuario3(nombres, apellidos,telefono, direccion,contraseña)
VALUES ('$nombres'$apellidos', '$telefono','$direccion', 'contraseña')";
$resul = mysql_query($conectar, $sql)or trigger_error
("Query Failet! SQL - Error: " . mysql_error($conectar), E_USER_NOTICE);

echo "sql";

if ($resul){
    echo "Registro Existoso";
    //o redireccionar a otra pagina
    // header("Location: Login.html);

}else{
    echo "Error al registrar";
}
?>
