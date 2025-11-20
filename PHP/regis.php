<?php
include_once('../PHP/db.php');

$conectar= conn(); //ejecuta las conexiones con db

//recibe los datos
$nombreCompleto =mysqli_real_escape_string($conectar, $_POST ['nombreCompleto']);
$email =mysqli_real_escape_string($conectar, $_POST ['email']);
$telefono =mysqli_real_escape_string($conectar, $_POST ['telefono']);
$direccion =mysqli_real_escape_string($conectar, $_POST ['direccion']);
$contrasenia =$_POST ['contrasenia'];


if(empty($nombreCompleto) || empty($email) || empty($telefono) || empty($direccion)||empty($contrasenia) ){
    die("Falta datos por completar");
}

$contrasenia =password_hash($_POST['contrasenia'], PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios(nombreCompleto, email, telefono, direccion, contrasenia)
VALUES ('$nombreCompleto', '$email', '$telefono', '$direccion', '$contrasenia')";

$resul = mysqli_query($conectar, $sql) or trigger_error ("Query Failet! SQL - Error: " . mysqli_error($conectar), E_USER_NOTICE);

//  echo "sql";

if ($resul){
    // echo "Registro Existoso";
    //o redireccionar a otra pagina
    header("Location: ../html/login.html");
    exit();

}else{
    echo "Error al registrar". mysqli_error($conectar);
    exit();
}
?>