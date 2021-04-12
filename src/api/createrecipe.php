<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('content-type: application/json;');


require 'conn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($postdata) && !empty($postdata))
{
    $name = mysqli_real_escape_string($conn, trim($request->name));
    $mealCategory = mysqli_real_escape_string($conn, trim($request->mealCategory));
    $dietaryRequirementName = mysqli_real_escape_string($conn, trim($request->dietaryRequirementName));
    $recipeCategory = mysqli_real_escape_string($conn, trim($request->recipeCategory));
    $description = mysqli_real_escape_string($conn, trim($request->description));
    $keywords = mysqli_real_escape_string($conn, trim($request->keywords));
    $calories = mysqli_real_escape_string($conn, trim($request->calories));
    $recipeServings = mysqli_real_escape_string($conn, trim($request->recipeServings));
    $recipeInstructions = mysqli_real_escape_string($conn, trim($request->recipeInstructions));
    $fatContent = mysqli_real_escape_string($conn, trim($request->fatContent));
    $saturatedFatContent = mysqli_real_escape_string($conn, trim($request->saturatedFatContent));
    $sodiumContent = mysqli_real_escape_string($conn, trim($request->sodiumContent));
    $carbohydrateContent = mysqli_real_escape_string($conn, trim($request->carbohydrateContent));
    $fibreContent = mysqli_real_escape_string($conn, trim($request->fibreContent));
    $sugarContent = mysqli_real_escape_string($conn, trim($request->sugarContent));
    $proteinContent = mysqli_real_escape_string($conn, trim($request->proteinContent));
    $authorId = mysqli_real_escape_string($conn, trim($request->authorId));
    $cookTime = mysqli_real_escape_string($conn, trim($request->cookTime));
    $prepTime = mysqli_real_escape_string($conn, trim($request->prepTime));
    $datePublished = mysqli_real_escape_string($conn, trim($request->datePublished));
    $recipeIngredientQuantities = mysqli_real_escape_string($conn, trim($request->recipeIngredientQuantities));
    $RecipeIngredientParts = mysqli_real_escape_string($conn, trim($request->RecipeIngredientParts));
    $cholesterolContent = mysqli_real_escape_string($conn, trim($request->cholesterolContent));
    $recipeYield = mysqli_real_escape_string($conn, trim($request->recipeYield));
    $images = mysqli_real_escape_string($conn, trim($request->images));
    $sql = "INSERT INTO `Recipes`( `Name`, `AuthorId`, `CookTime`, `PrepTime`, `DatePublished`, `Description`, `Images`, `RecipeCategory`, `Keywords`, `RecipeIngredientQuantities`, `RecipeIngredientParts`, `AggregatedRating`, `ReviewCount`, `Calories`, `FatContent`, `SaturatedFatContent`, `CholesterolContent`, `SodiumContent`, `CarbohydrateContent`, `FiberContent`, `SugarContent`, `ProteinContent`, `RecipeServings`, `RecipeInstructions`) VALUES ('$name', $authorId, $cookTime, $prepTime, '$datePublished', '$description', '$images', (SELECT RecipeCategoryId FROM RecipeCategories WHERE RecipeCategory = '$recipeCategory' LIMIT 1), '$keywords', '$recipeIngredientQuantities', '$RecipeIngredientParts', 0 , 0, $calories, $fatContent, $saturatedFatContent, $cholesterolContent, $sodiumContent, $carbohydrateContent, $fibreContent, $sugarContent, $proteinContent, $recipeServings, '$recipeInstructions' )";
    $sql2 = "INSERT INTO `RecipeCategories`( `RecipeCategory`) SELECT * FROM (SELECT '$recipeCategory') AS tmp WHERE NOT EXISTS (SELECT `RecipeCategory` FROM `RecipeCategories` WHERE `RecipeCategory` = '$recipeCategory') LIMIT 1";
    mysqli_query($conn,$sql2);
    if ($conn->query($sql) === true)
    {
        $recipe = ['name' => $name, 'mealCategory' => $mealCategory, 'dietaryRequirementName' => $dietaryRequirementName, 'recipeCategory' => $recipeCategory, 'description' => $description, 'keywords' => $keywords, 'calories' => $calories, 'recipeServings' => $recipeServings, 'recipeInstructions' => $recipeInstructions, 'fatContent' => $fatContent, 'saturatedFatContent' => $saturatedFatContent, 'sodiumContent' => $sodiumContent, 'carbohydrateContent' => $carbohydrateContent, 'fibreContent' => $fibreContent, 'sugarContent' => $sugarContent, 'proteinContent' => $proteinContent, 'authorId' => $authorId, 'cookTime' => $cookTime, 'prepTime' => $prepTime, 'datePublished' => $datePublished, 'recipeIngredientQuantities' => $recipeIngredientQuantities, 'RecipeIngredientParts' => $RecipeIngredientParts, 'cholesterolContent' => $cholesterolContent, 'RecipeId' => mysqli_insert_id($conn) ];
        echo json_encode($recipe);
    }
    $recipeId = $recipe['RecipeId'];
    $sql3 = "INSERT INTO `RecipeMealCategories`(`RecipeId`, `MealCategoryId`) VALUES ($recipeId, (Select MealCategoryId FROM MealCategories Where MealCategoryName = '$mealCategory'))";
    mysqli_query($conn,$sql3);
    $sql4 = "INSERT INTO `RecipeDietaryRequirements`(`RecipeId`, `DietaryRequirementId`) VALUES ($recipeId,(SELECT * FROM `DietaryRequirements` WHERE `DietaryRequirementName` = '$dietaryRequirementName'))";
    mysqli_query($conn,$sql4);
}
?>
