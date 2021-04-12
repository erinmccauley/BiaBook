<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type:application/json");
/**
 * Returns the recipe details
 */
require 'conn.php';
$recipe = [];
$recipeId = $_GET['recipeId']; 
$cr = 0; 
$sql= "SELECT * FROM Recipes WHERE RecipeId <  $recipeId ORDER BY RecipeId desc LIMIT 1";
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {
    $recipe[$cr]['RecipeId']    = $row['RecipeId'];
    $recipe[$cr]['Name'] = $row['Name'];
    $recipe[$cr]['AuthorId'] = $row['AuthorId'];
    $recipe[$cr]['CookTime'] = $row['CookTime'];
    $recipe[$cr]['PrepTime'] = $row['PrepTime'];
    $recipe[$cr]['TotalTime'] = $row['TotalTime'];
    $recipe[$cr]['DatePublished'] = $row['DatePublished'];
    $recipe[$cr]['Description'] = $row['Description'];
    $recipe[$cr]['Images'] = explode(', ',$row['Images']);
    $recipe[$cr]['RecipeCategory'] = $row['RecipeCategory'];
    $recipe[$cr]['Keywords'] = $row['Keywords'];
    $recipe[$cr]['RecipeIngredientQuantities'] = explode(', ',$row['RecipeIngredientQuantities']);
    $recipe[$cr]['RecipeIngredientParts'] = explode(', ',$row['RecipeIngredientParts']);
    $recipe[$cr]['AggregatedRating'] = $row['AggregatedRating'];
    $recipe[$cr]['ReviewCount'] = $row['ReviewCount'];
    $recipe[$cr]['Calories'] = $row['Calories'];
    $recipe[$cr]['FatContent'] = $row['FatContent'];
    $recipe[$cr]['SaturatedFatContent'] = $row['SaturatedFatContent'];
    $recipe[$cr]['CholesterolContent'] = $row['CholesterolContent'];
    $recipe[$cr]['SodiumContent'] = $row['SodiumContent'];
    $recipe[$cr]['CarbohydrateContent'] = $row['CarbohydrateContent'];
    $recipe[$cr]['FiberContent'] = $row['FiberContent'];
    $recipe[$cr]['SugarContent'] = $row['SugarContent'];
    $recipe[$cr]['ProteinContent'] = $row['ProteinContent'];
    $recipe[$cr]['RecipeServings'] = $row['RecipeServings'];
    $recipe[$cr]['RecipeYield'] = $row['RecipeYield'];
    $recipe[$cr]['RecipeInstructions'] = explode('., ',$row['RecipeInstructions']);
    $cr++;
  }
  echo json_encode($recipe, JSON_UNESCAPED_SLASHES);

}
else
{
    http_response_code(404);
}