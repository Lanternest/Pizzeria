<?php
//necesario para conectarse a la base de datos.
function conn(){
    $hostname = "localhost"
    $usuariodb ="root"
    $paswworddb =""
    $dnnombre = ""

//Genera la conexion con el servidor
$connectar = mysql.connect($hostaname, $usuariodb, $passworddb, $dbname)
return $connectar;
}
if($connectar){
  die("error de conexion: " . mysql.conect.error()) ; 
}
?>
