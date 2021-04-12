<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
require 'conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($postdata) && !empty($postdata))
{
$recipeId = mysqli_real_escape_string($conn, trim($request->recipeId));

// Delete.
$sql1 = "DELETE FROM `RecipeMealCategories` WHERE `RecipeId` = $recipeId";

$sql2 = "DELETE FROM `UserFavourites` WHERE `RecipeID` = $recipeId";

$sql3 = "DELETE FROM `RecipeDietaryRequirements` WHERE `RecipeId` = $recipeId";

$sql4 = "DELETE FROM `Recipes` WHERE `RecipeId` = $recipeId";

if (mysqli_query($conn, $sql1) && mysqli_query($conn, $sql2) && mysqli_query($conn, $sql3) && mysqli_query($conn, $sql4))
    {
        http_response_code(204);
    }
    else
    {
        return http_response_code(422);
    }
}
?>
