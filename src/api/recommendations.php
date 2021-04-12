<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type:application/json");
/**
 * Returns the recipe details
 */
require 'conn.php';
$recipes = [];
$keyword = $_GET["keyword"];
$currentRecipe = $_GET["currentRecipe"];  
$cr = 0; 
$sql= "SELECT * FROM Recipes WHERE `Keywords` LIKE '%$keyword%' AND Name NOT LIKE '%$currentRecipe%'";
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {
    $recipes[$cr]['RecipeId']    = $row['RecipeId'];
    $recipes[$cr]['Name'] = $row['Name'];
    $recipes[$cr]['AuthorId'] = $row['AuthorId'];
    $recipes[$cr]['CookTime'] = $row['CookTime'];
    $recipes[$cr]['PrepTime'] = $row['PrepTime'];
    $recipes[$cr]['TotalTime'] = $row['TotalTime'];
    $recipes[$cr]['DatePublished'] = $row['DatePublished'];
    $recipes[$cr]['Description'] = $row['Description'];
    $recipes[$cr]['Images'] = explode(', ',$row['Images']);
    $recipes[$cr]['RecipeCategory'] = $row['RecipeCategory'];
    $recipes[$cr]['Keywords'] = $row['Keywords'];
    $recipes[$cr]['RecipeIngredientQuantities'] = explode(', ',$row['RecipeIngredientQuantities']);
    $recipes[$cr]['RecipeIngredientParts'] = explode(', ',$row['RecipeIngredientParts']);
    $recipes[$cr]['AggregatedRating'] = $row['AggregatedRating'];
    $recipes[$cr]['ReviewCount'] = $row['ReviewCount'];
    $recipes[$cr]['Calories'] = $row['Calories'];
    $recipes[$cr]['FatContent'] = $row['FatContent'];
    $recipes[$cr]['SaturatedFatContent'] = $row['SaturatedFatContent'];
    $recipes[$cr]['CholesterolContent'] = $row['CholesterolContent'];
    $recipes[$cr]['SodiumContent'] = $row['SodiumContent'];
    $recipes[$cr]['CarbohydrateContent'] = $row['CarbohydrateContent'];
    $recipes[$cr]['FiberContent'] = $row['FiberContent'];
    $recipes[$cr]['SugarContent'] = $row['SugarContent'];
    $recipes[$cr]['ProteinContent'] = $row['ProteinContent'];
    $recipes[$cr]['RecipeServings'] = $row['RecipeServings'];
    $recipes[$cr]['RecipeYield'] = $row['RecipeYield'];
    $recipes[$cr]['RecipeInstructions'] = explode('., ',$row['RecipeInstructions']);
    $cr++;
  }
  echo json_encode($recipes, JSON_UNESCAPED_SLASHES);

}
else
{
    http_response_code(404);
}