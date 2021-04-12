<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

/**
 * Returns the list of recipes
 */
require 'conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($postdata) && !empty($postdata))
{
    $userId = mysqli_real_escape_string($conn, trim($request->userId));
    $recipeId = mysqli_real_escape_string($conn, trim($request->recipeId));

    $sql = "DELETE FROM `UserFavourites` WHERE `UserId` = $userId AND `RecipeID` = $recipeId";

    if (mysqli_query($conn, $sql))
    {
        http_response_code(204);
    }
    else
    {
        return http_response_code(422);
    }
}
?>
