<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
/**
 * Returns the list of meal categories
 */
require 'conn.php';
    
$mealCategory = [];
$recipe = [];
$mealName = $_GET['meal']; 
$sql = "SELECT * FROM `MealCategories` WHERE `MealCategoryName` = '$mealName'";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
    while($row = mysqli_fetch_assoc($result))
    {
      $mealCategory[$cr]['MealCategoryId'] = $row['MealCategoryId'];
      $mealCategory[$cr]['MealCategoryName'] = $row['MealCategoryName'];
      $cr++;

    }
    echo json_encode($mealCategory, JSON_UNESCAPED_SLASHES);

}
        else
    {
    http_response_code(404);
}

?>