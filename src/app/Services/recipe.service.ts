import { Recipe } from './../recipe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Author } from '../author';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

baseUrl = 'http://eoloughlin05.lampt.eeecs.qub.ac.uk/api';

constructor(private http: HttpClient) { }

getAll(): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.baseUrl}/list.php`);
}

getFavouriteRecipes(userId): Observable<Recipe[]> {
  const params = new HttpParams().set('userId', userId);
  return this.http.get<Recipe[]>(`${this.baseUrl}/getFavouriteRecipes.php`, {params: params});
}

async getRecipe(recipeId) {
  const params = new HttpParams().set('recipeId', recipeId);
  return await this.http.get<Recipe[]>(`${this.baseUrl}/recipedetails.php`, {params:params}).toPromise();
}

getRecipeByKeyword(keyword: string, currentRecipe: string): Observable<Recipe[]> {
  const params = new HttpParams()
  .set('keyword', keyword)
  .set('currentRecipe', currentRecipe);
  return  this.http.get<Recipe[]>(`${this.baseUrl}/recommendations.php`, {params:params});
}

getNextRecipe(recipeId): Observable<Recipe[]> {
  const params = new HttpParams().set('recipeId', recipeId);
  return this.http.get<Recipe[]>(`${this.baseUrl}/nextrecipe.php`, {params:params})
}

getRecipeByMeal(mealCategory): Observable<Recipe[]>
{
  const params = new HttpParams().set('mealId', mealCategory);
  return this.http.get<Recipe[]>(`${this.baseUrl}/recipebymealId.php`, {params:params});
}

getPreviousRecipe(recipeId): Observable<Recipe[]> {
  const params = new HttpParams().set('recipeId', recipeId);
  return this.http.get<Recipe[]>(`${this.baseUrl}/previousrecipe.php`, {params:params})
}

getRecipeAuthor(authorId): Observable<Author[]> {
  const params = new HttpParams().set('authorId', authorId);
  return this.http.get<Author[]>(`${this.baseUrl}/recipeauthor.php`, {params:params})
}

postRecipe(authorId, name, mealCategory, dietaryRequirementName, recipeCategory, description,
  keywords, calories, recipeServings, recipeInstructions, fatContent, saturatedFatContent, sodiumContent, carbohydrateContent,
  fibreContent, sugarContent, proteinContent, cookTime, prepTime,
  datePublished, recipeIngredientQuantities, RecipeIngredientParts, cholesterolContent, recipeYield, images) {

    return this.http.post<Recipe> (`${environment.apiUrl}/createrecipe.php`, {authorId, name, mealCategory, dietaryRequirementName, recipeCategory, description,
      keywords, calories, recipeServings, recipeInstructions, fatContent, saturatedFatContent, sodiumContent, carbohydrateContent,
      fibreContent, sugarContent, proteinContent, cookTime, prepTime,
      datePublished, recipeIngredientQuantities, RecipeIngredientParts, cholesterolContent, recipeYield, images}).toPromise();
}

async delete(recipeId) {
  return this.http.post<any>(`${environment.apiUrl}/deleterecipe.php`, { recipeId }).toPromise();
}

async getIsFavourite(userId, recipeId) {
  const params = new HttpParams()
  .set('userId', userId)
  .set('recipeId', recipeId);
  return this.http.get<string> (`${environment.apiUrl}/userfavourite.php`, {params:params}).toPromise();

}

addFavourite(userId, recipeId) {
  return this.http.post<any>(`${environment.apiUrl}/addUserFavourite.php`, {userId, recipeId})
  .pipe(map(favourite => {
    console.log('call made');
    return favourite;
  }));
}


deleteFavourite(userId, recipeId) {
  const params = new HttpParams()
      .set('userId', userId)
      .set('recipeId', recipeId);
  return this.http.post<any>(`${environment.apiUrl}/deleteUserFavourite.php`, {userId, recipeId});
}
}

