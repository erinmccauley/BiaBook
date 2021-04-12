<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type:application/json");

require 'conn.php';
$favourite = [];
$recipeId = $_GET['recipeId']; 
$userId = $_GET['userId'];
$sql= "SELECT count(*) as rowCount FROM `UserFavourites` WHERE UserID = $userId AND RecipeId = $recipeId";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
    while($row = mysqli_fetch_assoc($result))
    {
        $favourite[$cr]['rowCount'] = $row['rowCount'];
        $cr++;

    }
    if($favourite[0]['rowCount'] > 0)
    {
        echo 'true';
    }
    else {
        echo 'false';
    }
    
}

?>