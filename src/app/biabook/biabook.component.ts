import { DietaryrequirementsService } from './../Services/dietaryrequirements.service';
import { DietaryRequirement } from './../dietaryrequirement';
import { MealcategoriesService } from './../Services/mealcategories.service';
import { MealCategory } from './../mealcategory';
import { CategoriesService } from './../Services/categories.service';
import { HostListener, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biabook',
  templateUrl: './biabook.component.html',
  styleUrls: ['./biabook.component.css']
})
export class BiabookComponent implements OnInit {
  isCollapsed = true;
  isbtnCollapsed =true;
  isdrCollapsed=true;
  issCollapsed=true;
  rCollapsed=true;
  mealCategories: MealCategory[];
  dietaryRequirements: DietaryRequirement[];
  public currentWindowWidth: number;
  mealCategorySearch: string;
  dietaryRequirementSearch: string;
  servingsSearch: string;
  searchTerms: string;
  ratingSearch: string;
  dietaryButton: string = 'Dietary Requirements';
  mealCategoryButton: string = 'Meal Category';
  servingsButton: string = 'Servings';
  ratingButton: string = 'Review Rating';

  constructor(private MealcategoriesService: MealcategoriesService, private DietaryrequirementsService: DietaryrequirementsService,
    private router: Router) { }

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
    this.getRecipes();
    this.getDietaryRequirements();
  }
  @HostListener('window:resize')
onResize () {
this.currentWindowWidth = window.innerWidth;
}

getRecipes(): void {
  this.MealcategoriesService.getAll().subscribe((mealCategories: MealCategory[]) => {
    this.mealCategories = mealCategories;
  });
}

getDietaryRequirements(): void {
  this.DietaryrequirementsService.getAll().subscribe((dietaryRequirements: DietaryRequirement[]) => {
    this.dietaryRequirements = dietaryRequirements;
  });
}

mealCategoryClick(mealCategory){
  this.isbtnCollapsed=!this.isbtnCollapsed
  this.mealCategorySearch = mealCategory;
  this.mealCategoryButton = mealCategory;
  console.log(this.mealCategorySearch)
}


dietaryClick(dietaryRequirement){
  this.isdrCollapsed=!this.isdrCollapsed;
  this.dietaryRequirementSearch = dietaryRequirement;
  this.dietaryButton = dietaryRequirement;
}

servingsClick(servings){
  this.issCollapsed=!this.issCollapsed;
  this.servingsSearch = servings;
  this.servingsButton = servings;
}

reviewClick(rating){
  this.rCollapsed=!this.rCollapsed;
  this.ratingSearch = rating;
  this.ratingButton = rating;
}

search() {
  this.router.navigate(['/recipelist'], {queryParams: {search: this.searchTerms, meal: this.mealCategorySearch, dietary: this.dietaryRequirementSearch, servings: this.servingsSearch, rating: this.ratingSearch }})
  console.log(this.searchTerms);
}

change(event){
  this.searchTerms = event.target.value;
}

}
