<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

/**
 * Returns the list of recipes
 */
require 'conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
    echo $postdata;
    $userId = mysqli_real_escape_string($conn, trim($request->userId));
    $recipeId = mysqli_real_escape_string($conn, trim($request->recipeId));

    $sql = "INSERT INTO `UserFavourites`(`UserId`, `RecipeID`) VALUES ($userId,$recipeId)";
    echo $sql;
    if ($conn->query($sql) === TRUE) {

        $userFavourite = [
        'recipeId' => $recipeId,
        'user' => $user
        ];
        echo json_encode($userFavourite);
        }
        }
        
        ?>
