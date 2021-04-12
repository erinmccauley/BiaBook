<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
/**
 * Returns the list of users
 */
require 'conn.php';
    
$users = [];
$sql = "SELECT * FROM Users";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$cr]['Id']    = $row['id'];
    $users[$cr]['Username'] = $row['username'];
    $users[$cr]['Password'] = $row['password'];
    $users[$cr]['Email'] = $row['email'];
    $cr++;
  }
  echo json_encode($users, JSON_UNESCAPED_SLASHES);

}
else
{
  http_response_code(404);
}