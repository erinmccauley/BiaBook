<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
/**
 * Returns the list of recipes
 */
require 'conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
$username = mysqli_real_escape_string($conn, trim($request->username));
$pwd = mysqli_real_escape_string($conn, trim($request->password));
$sql = "SELECT * FROM Users where username='$username' and password=MD5('$pwd')";
if($result = mysqli_query($conn,$sql))
{
$rows = array();
while($row = mysqli_fetch_assoc($result))
{
$rows[] = $row;
}
echo json_encode($rows);
}
else
{
http_response_code(404);
}
}
?>