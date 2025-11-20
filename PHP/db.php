<?php
function conn(){
    $hostname = "localhost";
    $usuariodb ="root";
    $passworddb ="";
    $dbname = "pizzeria";

    $conectar = mysqli_connect($hostname, $usuariodb, $passworddb, $dbname);

    if(!$conectar){
        die("error de conexion: ".mysqli_connect_error()); 
    }

    return $conectar;
}
?>
