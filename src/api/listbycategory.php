<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type:application/json");
/**
 * Returns the list by category
 */
require 'conn.php';
$category = $_GET['RecipeCategory'];  
$recipes = [];
$sql = "SELECT r.* FROM `Recipes` r 
        JOIN RecipeCategories rc ON r.RecipeCategory = rc.RecipeCategoryId WHERE rc.RecipeCategory = $RecipeCategory";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
  while($row = mysqli_fetch_assoc($result))
  {
    $recipes[$cr]['RecipeId']= $row['RecipeId'];
    $recipes[$cr]['Name'] = $row['Name'];
    $recipes[$cr]['AuthorId'] = $row['AuthorId'];
    $recipes[$cr]['CookTime'] = $row['CookTime'];
    $recipes[$cr]['PrepTime'] = $row['PrepTime'];
    $recipes[$cr]['TotalTime'] = $row['TotalTime'];
    $recipes[$cr]['DatePublished'] = $row['DatePublished'];
    $recipes[$cr]['Description'] = $row['Description'];
    $recipes[$cr]['Images'] = explode(', ' ,$row['Images']);
    $recipes[$cr]['RecipeCategory'] = $row['RecipeCategory'];
    $recipes[$cr]['Keywords'] = $row['Keywords'];
    $recipes[$cr]['RecipeIngredientQuantities'] = $row['RecipeIngredientQuantities'];
    $recipes[$cr]['RecipeIngredientParts'] = $row['RecipeIngredientParts'];
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
    $recipes[$cr]['RecipeInstructions'] = $row['RecipeInstructions'];
    $cr++;
  }
  echo json_encode($recipes);

}
else
{
  http_response_code(404);
}





