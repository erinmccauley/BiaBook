import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/recipe';
import { RecipeService } from 'src/app/Services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipesadmin',
  templateUrl: './recipesadmin.component.html',
  styleUrls: ['./recipesadmin.component.css']
})
export class RecipesadminComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecipes();
  }

  async getRecipes(): Promise<void> {
    this.recipes = await this.recipeService.getAll().toPromise();
  }

  async deleteRecipe(recipeId, recipeName) {
    if (confirm('Do you want to delete ' + recipeId + ': ' + recipeName)) {
      await this.recipeService.delete(recipeId);
      this.getRecipes();
    }

  }


  trackByFn(index, item) {
    return index;
  }

}
