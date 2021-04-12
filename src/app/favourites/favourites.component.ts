import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';
import { AccountService } from '../Services/account.service';
import { RecipeService } from '../Services/recipe.service';
import {faStar, faHeart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  recipes: Recipe[] = [];
  user = sessionStorage.getItem('token');
  userId: any;
  faHeart = faHeart;
  faStar = faStar;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private accountService: AccountService) { }

  ngOnInit() {
    this.getRecipes();  
    

  }


  async getRecipes(): Promise<void> {
    this.userId = await this.accountService.getIdByUsername(this.user);
    this.recipes = await this.recipeService.getFavouriteRecipes(this.userId[0].id).toPromise();
    console.log(this.recipes);
  }

  async unFavouriteRecipe(recipeId) {
    this.recipeService.deleteFavourite(this.userId[0].id, recipeId).subscribe(res => {
      console.log(res);
    });
    this.recipes = await this.recipeService.getFavouriteRecipes(this.userId[0].id).toPromise();
  }

  trackByFn(index, item) {
    return index;
  }

}
