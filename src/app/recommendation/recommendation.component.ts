import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Recipe } from '../recipe';
import { RecipeService } from '../Services/recipe.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit, OnChanges {

  @Input() recipe: Recipe[];
  recommendedRecipes: Recipe[] = [];
  selectedRecommendedRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.recommendedRecipes =[];
    this.getRecommendations();
  }

  ngOnInit() {
    this.getRecommendations();
  }

  async getRecommendations() {
    var keywords = this.recipe[0].Keywords.split(",");
    keywords.forEach(async key => {
      this.recipeService.getRecipeByKeyword(key, this.recipe[0].Name).subscribe((recipe: Recipe[]) => {
        recipe.forEach(r => {
          this.recommendedRecipes.push(r);
        })
      });
    })
  }
}

