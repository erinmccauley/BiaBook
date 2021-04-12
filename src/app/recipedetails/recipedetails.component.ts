import { Recipe } from './../recipe';
import { RecipeService } from './../Services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../author';
import {faStar, faHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faRegHeart} from '@fortawesome/free-regular-svg-icons';
import { Review } from '../review';
import { ReviewsService } from '../Services/reviews.service';
import { AccountService } from '../Services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css']
})
export class RecipedetailsComponent implements OnInit {
  recipe: Recipe[] =[];
  nextRecipe: Recipe[] =[];
  previousRecipe: Recipe[]= [];
  recipeAuthor: Author[] = [];
  faStar = faStar;
  faHeart = faHeart;
  faRegHeart = faRegHeart;
  isFavourited: boolean;
  reviews: Review[] = [];
  isLoggedIn: boolean = false;
  user = sessionStorage.getItem('token');
  userId: any;


  constructor(private recipeService: RecipeService, private route: ActivatedRoute, 
    private reviewService: ReviewsService, private accountService: AccountService) {
    route.params.subscribe(val => {
      this.getRecipe();
      
    })
  }

  ngOnInit() {
    this.isUserLoggedIn();    
  }

  async getRecipe() {
    this.recipe = await this.recipeService.getRecipe(+this.route.snapshot.params.id);
    if(this.recipe[0].RecipeIngredientQuantities.length === 1)
    {
      this.recipe[0].RecipeIngredientParts = this.recipe[0].RecipeIngredientParts[0].split(',');
      this.recipe[0].RecipeIngredientQuantities = this.recipe[0].RecipeIngredientQuantities[0].split(',');
    }
    this.getNextRecipe();
    this.getPreviousRecipe();
    this.getRecipeAuthor();
    this.getReviews();
    this.userId = await this.accountService.getIdByUsername(this.user);
    
    this.getIsFavourited();
  }

  async getIsFavourited() {
    let result = await this.recipeService.getIsFavourite(this.userId[0].id, this.recipe[0].RecipeId );
    (result) ? this.isFavourited = true : this.isFavourited = false;
    
  }

  async favouriteRecipe() {
  this.recipeService.addFavourite(this.userId[0].id, this.recipe[0].RecipeId).pipe().subscribe(res => {
      console.log(res);
    });
    this.isFavourited = !this.isFavourited;
  }

  unFavouriteRecipe() {
    this.recipeService.deleteFavourite(this.userId[0].id, this.recipe[0].RecipeId).subscribe(res => {
      console.log(res);
    });
    this.isFavourited = !this.isFavourited;
  }

  async getNextRecipe(): Promise<void> {
    await this.recipeService.getNextRecipe(+this.route.snapshot.params.id).subscribe((recipe: Recipe[]) => {
      this.nextRecipe = recipe;
    });
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.accountService.isLoggedIn();
    console.log(this.isLoggedIn);
  }

  async getPreviousRecipe(): Promise<void> {
    await this.recipeService.getPreviousRecipe(+this.route.snapshot.params.id).subscribe((recipe: Recipe[]) => {
      this.previousRecipe = recipe;
    });
  }

  async getRecipeAuthor(): Promise<void> {
    await this.recipeService.getRecipeAuthor(this.recipe[0].AuthorId).subscribe((author: Author[]) => {
      this.recipeAuthor = author;
    });
  }

  getReviews(){
    this.reviewService.getAll(this.recipe[0].RecipeId).subscribe((review: Review[]) => {
      this.reviews= review;
    });
  }

  favouriteRecipeNotLoggedIn() {
    alert('Please login to add recipe to favourites!')
  }
}
