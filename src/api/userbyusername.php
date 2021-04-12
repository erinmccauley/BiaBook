<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type:application/json");
/**
 * Returns the recipe details
 */
require 'conn.php';
$user = [];
$username = $_GET['username'];
$cr = 0;
$sql= "SELECT id FROM Users WHERE username = '$username' LIMIT 1";
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {      
    $user[$cr]['id'] = $row['id'];
    $cr++;
  }
  echo json_encode($user, JSON_UNESCAPED_SLASHES);

}
else
{
    http_response_code(404);
}

