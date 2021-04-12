<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
/**
 * Returns the list of servings from recipes
 */
require 'conn.php';
    
$servings = [];
$sql = "SELECT DISTINCT RecipeServings FROM Recipes ORDER BY RecipeServings";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
    while($row = mysqli_fetch_assoc($result))
    {
      $servings[$cr]['RecipeServings'] = $row['RecipeServings'];
      $cr++;

    }
    echo json_encode($servings, JSON_UNESCAPED_SLASHES);

}
        else
    {
    http_response_code(404);
}