<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type:application/json");
/**
 * Returns the reviews
 */
require 'conn.php';
$recipeId = $_GET['recipeId'];  
$reviews = [];
$sql= "SELECT * FROM Reviews WHERE RecipeId = $recipeId ORDER BY DateModified DESC";

$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {
    $reviews[$cr]['ReviewId']= $row['ReviewId'];
    $reviews[$cr]['RecipeId']= $row['RecipeId'];
    $reviews[$cr]['AuthorId']= $row['AuthorId'];
    $reviews[$cr]['Rating']= $row['Rating'];
    $reviews[$cr]['Review']= $row['Review'];
    $reviews[$cr]['DateSubmitted']= $row['DateSubmitted'];
    $reviews[$cr]['DateModified']= $row['DateModified'];
    $cr++;
  }
  echo json_encode($reviews);

}
else
{
    http_response_code(404);
}