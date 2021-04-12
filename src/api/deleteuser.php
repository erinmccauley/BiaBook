<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
require 'conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($postdata) && !empty($postdata))
{
$userId = mysqli_real_escape_string($conn, trim($request->userId));

// Delete.
$sql1 = "UPDATE `Reviews` SET `AuthorId`=518 WHERE AuthorId =  $userId";

$sql2 = "DELETE FROM `UserFavourites` WHERE `UserId` = $userId";

$sql3 = "UPDATE `Recipes` SET `AuthorId`=518 WHERE AuthorId =  $userId";

$sql4 = "DELETE FROM `Users` WHERE `id` = $userId";

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
