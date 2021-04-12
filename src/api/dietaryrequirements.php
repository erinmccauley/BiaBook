<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
/**
 * Returns the list of dietary requirements
 */
require 'conn.php';
    
$dietaryRequirements = [];
$sql = "SELECT * FROM DietaryRequirements";
$cr = 0;
$conn -> set_charset("utf8");
if($result = mysqli_query($conn,$sql))
{
    while($row = mysqli_fetch_assoc($result))
    {
      $dietaryRequirements [$cr]['DietaryRequirementId'] = $row['DietaryRequirementId'];
      $dietaryRequirements [$cr]['DietaryRequirementName'] = $row['DietaryRequirementName'];
      $cr++;

    }
    echo json_encode($dietaryRequirements, JSON_UNESCAPED_SLASHES);

}
        else
    {
    http_response_code(404);
}