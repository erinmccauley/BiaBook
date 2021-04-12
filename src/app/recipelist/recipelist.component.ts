import { Recipe } from './../recipe';
import { RecipeService } from './../Services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealcategoriesService } from '../Services/mealcategories.service';
import {faStar, faHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faRegHeart} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit {
  recipes: Recipe[] = [];
  recipesAll: Recipe[];
  error = '';
  success = '';
  filterargs: any;
  user = sessionStorage.getItem('token');
  userId: any;
  faHeart = faHeart;
  faRegHeart = faRegHeart;
  faStar = faStar;
  isFavourited: boolean;
  searchText:string ='';
  orderOption: string = '';

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private mealService: MealcategoriesService) {

  }

  ngOnInit() {
    this.getRecipes();

  }

  async getRecipes(): Promise<void> {
    this.recipes = await this.recipeService.getAll().toPromise();
    this.recipesAll = await this.recipeService.getAll().toPromise();
    this.searchTerms();
  }

  async searchTerms() {
    let search = this.route.snapshot.queryParamMap.get('search');
    let meal = this.route.snapshot.queryParamMap.get('meal');
    let dietary = this.route.snapshot.queryParamMap.get('dietary');
    let servings = this.route.snapshot.queryParamMap.get('servings');
    let rating = this.route.snapshot.queryParamMap.get('rating');

    if (search != null) {
      this.recipes = this.recipes.filter(s => s.Keywords.toLowerCase().includes(search.toLowerCase()) || s.Name.toLowerCase().includes(search.toLowerCase()) );
      this.recipesAll = this.recipesAll.filter(s => s.Keywords.toLowerCase().includes(search.toLowerCase()) || s.Name.toLowerCase().includes(search.toLowerCase()));
    }
    if (meal != null) {
      let mealId = await this.mealService.getByName(meal).toPromise();
      let recipeMeals = await this.recipeService.getRecipeByMeal(mealId[0].MealCategoryId).toPromise();
      this.recipes = this.recipes.filter(x => recipeMeals.map(y => y.RecipeId).includes(x.RecipeId));
      this.recipesAll = this.recipesAll.filter(x => recipeMeals.map(y => y.RecipeId).includes(x.RecipeId));
    }
    if (servings != null) {
      if (servings === '1') {
        this.recipes = this.recipes.filter(r => r.RecipeServings < 2);
        this.recipesAll = this.recipesAll.filter(r => r.RecipeServings < 2);
      }
      else if (servings === '2') {
        this.recipes = this.recipes.filter(r => r.RecipeServings < 3);
        this.recipesAll = this.recipesAll.filter(r => r.RecipeServings < 3);
      }
      else if (servings === '3-4') {
        this.recipes = this.recipes.filter(r => r.RecipeServings > 2 && r.RecipeServings < 5);
        this.recipesAll = this.recipesAll.filter(r => r.RecipeServings > 2 && r.RecipeServings < 5);
      }
      else if (servings === '5-6') {
        this.recipes = this.recipes.filter(r => r.RecipeServings > 4 && r.RecipeServings < 7);
        this.recipesAll = this.recipesAll.filter(r => r.RecipeServings > 4 && r.RecipeServings < 7);
      }
      else if (servings === '6-10') {
        this.recipes = this.recipes.filter(r => r.RecipeServings > 5 && r.RecipeServings < 11);
        this.recipesAll = this.recipesAll.filter(r => r.RecipeServings > 5 && r.RecipeServings < 11);
      }
      else if (servings === '10+') {
        this.recipes = this.recipes.filter(r => r.RecipeServings > 10);
        this.recipesAll = this.recipesAll.filter(r => r.RecipeServings > 10);
      }
    }

    if (rating != null) {
      if (rating === '1') {
        this.recipes = this.recipes.filter(r => r.AggregatedRating > 0);
        this.recipesAll = this.recipesAll.filter(r => r.AggregatedRating > 0);
      }
      else if (rating === '2') {
        this.recipes = this.recipes.filter(r => r.AggregatedRating > 1);
        this.recipesAll = this.recipesAll.filter(r => r.AggregatedRating > 1);
      }
      else if (rating === '3') {
        this.recipes = this.recipes.filter(r => r.AggregatedRating > 2);
        this.recipesAll = this.recipesAll.filter(r => r.AggregatedRating > 2);
      }
      else if (rating === '4') {
        this.recipes = this.recipes.filter(r => r.AggregatedRating > 3);
        this.recipesAll = this.recipesAll.filter(r => r.AggregatedRating > 3);
      }
      else if (rating === '5') {
        this.recipes = this.recipes.filter(r => r.AggregatedRating > 4);
        this.recipesAll = this.recipesAll.filter(r => r.AggregatedRating > 4);
      }
    }

    if (dietary != null) {
      if (dietary === 'Vegetarian') {
        this.recipes = this.recipes.filter(r => r.Description.includes('vegetarian'));
        this.recipesAll = this.recipesAll.filter(r => r.Description.includes('vegetarian'));
      }
      else if (dietary === 'Vegan') {
        this.recipes = this.recipes.filter(r => r.Keywords.includes('Vegan'));
        this.recipesAll = this.recipesAll.filter(r => r.Keywords.includes('Vegan'));
      }
      else if (dietary === 'Low Carb') {
        this.recipes = this.recipes.filter(r => r.CarbohydrateContent < 10);
        this.recipesAll = this.recipesAll.filter(r => r.CarbohydrateContent < 10);
      }
      else if (dietary === 'Sugar-Free') {
        this.recipes = this.recipes.filter(r => r.SugarContent < 1);
        this.recipesAll = this.recipesAll.filter(r => r.SugarContent < 1);
      }
      else if (dietary === 'Lactose-Free') {
        this.recipes = this.recipes.filter(r => r.Keywords.includes('Lactose'));
        this.recipesAll = this.recipesAll.filter(r => r.Keywords.includes('Lactose'));
      }
      else if (dietary === 'Gluten-Free') {
        this.recipes = this.recipes.filter(r => r.Keywords.includes('Gluten'));
        this.recipesAll = this.recipesAll.filter(r => r.Keywords.includes('Gluten'));
      }
    }
  }

  filter(msg) {
    this.recipes = this.recipesAll;
    if (msg === 'sugar') {
      this.recipes = this.recipes.filter(r => r.SugarContent < 1);
    }
    else if (msg === 'carb') {
      this.recipes = this.recipes.filter(r => r.CarbohydrateContent < 10);
    }
    else if (msg === 'vegan') {
      this.recipes = this.recipes.filter(r => r.Keywords.includes('Vegan'));
    }

    else if (msg === 'lactose') {
      this.recipes = this.recipes.filter(r => r.Keywords.includes('Lactose'));
    }

    else if (msg === 'gluten') {
      this.recipes = this.recipes.filter(r => r.Keywords.includes('Gluten'));
    }

    else if (msg === 'veg') {
      this.recipes = this.recipes.filter(r => r.Description.includes('vegetarian'));
    }
  }

  trackByFn(index, item) {
    return index;
  }

  searchRecipes() {
    this.recipes = this.recipes.filter(r => r.Name.includes(this.searchText));
    this.recipes = this.recipes.filter(r => r.Keywords.includes(this.searchText));
    this.recipes = this.recipes.filter(r => r.Description.includes(this.searchText));

  }
  
  async getIsFavourited(recipeId) {
    let result = await this.recipeService.getIsFavourite(this.userId[0].id, recipeId );
    (result) ? this.isFavourited = true : this.isFavourited = false;
    return result;
    
  }

  async favouriteRecipe(recipeId) {
  this.recipeService.addFavourite(this.userId[0].id, recipeId).pipe().subscribe(res => {
      console.log(res);
    });
    this.isFavourited = !this.isFavourited;
  }

  unFavouriteRecipe(recipeId) {
    this.recipeService.deleteFavourite(this.userId[0].id, recipeId).subscribe(res => {
      console.log(res);
    });
    this.isFavourited = !this.isFavourited;
  }

  onKey(event) { 
    this.searchText = event.target.value;
  }

  search() {
    if(this.searchText != '')
    {
      this.recipes = this.recipes.filter(s => s.Keywords.toLowerCase().includes(this.searchText.toLowerCase()) || s.Name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    if(this.orderOption === 'rating')
    {
      this.recipes = this.recipes.sort((a,b) => b.AggregatedRating - a.AggregatedRating);
    }

    if(this.orderOption === 'rating')
    {
      this.recipes = this.recipes.sort((a,b) => b.AggregatedRating - a.AggregatedRating);
    }
    console.log(this.searchText);
  }

}
