<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
/**
 * Returns the list of recipe categories
 */
require 'conn.php';
    
$categories = [];
$sql = "SELECT * FROM RecipeCategories";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
    while($row = mysqli_fetch_assoc($result))
    {
      $categories[$cr]['RecipeCategoryId'] = $row['RecipeCategoryId'];
      $categories[$cr]['RecipeCategory'] = $row['RecipeCategory'];
      $cr++;

    }
    echo json_encode($categories, JSON_UNESCAPED_SLASHES);

}
        else
    {
    http_response_code(404);
}
