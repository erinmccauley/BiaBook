import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';
import { AccountService } from '../Services/account.service';
import { RecipeService } from '../Services/recipe.service';

@Component({
  selector: 'app-createrecipe',
  templateUrl: './createRecipe.component.html',
  styleUrls: ['./createRecipe.component.css']
})

export class CreateRecipeComponent implements OnInit {
  form: FormGroup;
  recipeIngredients: FormArray;
  newRecipe: Recipe;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,
    private recipeService: RecipeService,    private router: Router) {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      MealCategory: ['', Validators.required],
      DietaryRequirementName: ['', Validators.required],
      RecipeCategory: ['', Validators.required],
      Description: ['', Validators.required],
      Keywords: ['', Validators.required],
      Calories: ['', Validators.required],
      RecipeServings: ['', Validators.required],
      RecipeInstructions: ['', Validators.required],
      FatContent: ['', Validators.required],
      SaturatedFatContent: ['', Validators.required],
      SodiumContent: ['', Validators.required],
      CarbohydrateContent: ['', Validators.required],
      FibreContent: ['', Validators.required],
      SugarContent: ['', Validators.required],
      ProteinContent: ['', Validators.required],
      Images: ['', Validators.required],
      RecipeIngredients: this.formBuilder.array([this.createIngredient()]),
      PrepTime: ['', Validators.required],
      CookTime: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  get f() { return this.form.controls; }

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      RecipeIngredient: '',
      RecipeIngredientQuantity: ''
    });
 }
  get RecipeIngredients() {
    return this.form.get('RecipeIngredients')['controls'];
  }

  addIngredient(): void {
    this.recipeIngredients = this.form.get('RecipeIngredients') as FormArray;
    this.recipeIngredients.push(this.createIngredient());
    
  }

  deleteIngredient(index) {
    this.recipeIngredients.removeAt(index);
  }
  
  async onSubmit() {
    var username = this.accountService.getToken();
    let author = await this.accountService.getIdByUsername(username);
    let authorId = author[0].id; 
    let datePublished = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    let recipeIngredients: string[] = [];
    for(let c of this.f.RecipeIngredients.value){
      recipeIngredients.push(c.RecipeIngredient);
    }

    let recipeQuantities: string[] = [];
    for(let c of this.f.RecipeIngredients.value){
      recipeQuantities.push(c.RecipeIngredientQuantity);
    }
    
    this.newRecipe = await this.recipeService.postRecipe(authorId, this.f.Name.value, this.f.MealCategory.value, this.f.DietaryRequirementName.value, this.f.RecipeCategory.value,
      this.f.Description.value, this.f.Keywords.value, this.f.Calories.value, this.f.RecipeServings.value,
      this.f.RecipeInstructions.value, this.f.FatContent.value, this.f.SaturatedFatContent.value, this.f.SodiumContent.value,
      this.f.CarbohydrateContent.value, 
      this.f.FibreContent.value, 
      this.f.SugarContent.value, 
      this.f.ProteinContent.value, 
      this.f.CookTime.value, 
      this.f.PrepTime.value,
      datePublished, recipeQuantities.toString(), recipeIngredients.toString(), '0', '', this.f.Images.value );

      this.router.navigate(['recipe/', this.newRecipe.RecipeId]);
      console.log(this.newRecipe);

    
  }

}