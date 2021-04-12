<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
/**
 * Returns the list of meal categories
 */
require 'conn.php';
    
$mealCategories = [];
$sql = "SELECT * FROM MealCategories";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
    while($row = mysqli_fetch_assoc($result))
    {
      $mealCategories[$cr]['MealCategoryId'] = $row['MealCategoryId'];
      $mealCategories[$cr]['MealCategoryName'] = $row['MealCategoryName'];
      $cr++;

    }
    echo json_encode($mealCategories, JSON_UNESCAPED_SLASHES);

}
        else
    {
    http_response_code(404);
}
