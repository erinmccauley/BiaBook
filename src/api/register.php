<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");


require 'conn.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$name = trim($request->name);
$pwd = mysqli_real_escape_string($conn, trim($request->pwd));
$email = mysqli_real_escape_string($conn, trim($request->email));
$sql = "INSERT INTO Users(username,password,email) VALUES ('$name',MD5('$pwd'),'$email')";
if ($conn->query($sql) === TRUE) {
$authdata = [
'name' => $name,
'pwd' => '',
'email' => $email,
'Id' => mysqli_insert_id($conn)
];
echo json_encode($authdata);
}
}

?>