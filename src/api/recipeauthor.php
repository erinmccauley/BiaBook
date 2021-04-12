<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type:application/json");
/**
 * Returns the recipe details
 */
require 'conn.php';
$author = [];
$authorId = $_GET['authorId']; 
$cr = 0; 
$sql= "SELECT `username` FROM Users WHERE id = $authorId LIMIT 1";
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {
      
    $author[$cr]['username'] = $row['username'];
    $cr++;
  }
  echo json_encode($author, JSON_UNESCAPED_SLASHES);

}
else
{
    http_response_code(404);
}