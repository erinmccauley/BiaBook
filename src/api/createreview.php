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
if(isset($postdata) && !empty($postdata))
{
$authorId = mysqli_real_escape_string($conn, trim($request->authorId));
$dateModified = mysqli_real_escape_string($conn, trim($request->dateModified));
$dateSubmitted = mysqli_real_escape_string($conn, trim($request->dateSubmitted));
$rating = mysqli_real_escape_string($conn, trim($request->rating));
$recipeId = mysqli_real_escape_string($conn, trim($request->recipeId));
$review = mysqli_real_escape_string($conn, trim($request->review));
$sql = "INSERT INTO `Reviews`( `RecipeId`, `AuthorId`, `Rating`, `Review`, `DateSubmitted`, `DateModified`) VALUES ($recipeId,$authorId,$rating,'$review','$dateSubmitted','$dateModified');
UPDATE `Recipes` SET `AggregatedRating`=(select ROUND(SUM(`Rating`)/Count(*), 0) from Reviews where `RecipeId` = $recipeId) WHERE `RecipeId` = $recipeId";
if ($conn->query($sql) === TRUE) {
    $review = [
    'recipeId' => $recipeId,
    'authorId' => $authorId,
    'review' => $review,
    'id' => mysqli_insert_id($conn),
    'rating' => $rating
    ];
    echo json_encode($review);
    }
    }
    
    ?>