<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");

$pw="7cfn8g7PPqHCZy34";
$user = "eoloughlin05";
$webserver = "eoloughlin05.lampt.eeecs.qub.ac.uk";
$db = "eoloughlin05";

//mysqli api library in PHP to connect to the DB
$conn = new mysqli($webserver, $user, $pw, $db);

if($conn->connect_error){
    echo "Connection failed: ".$conn->connect_error;
}