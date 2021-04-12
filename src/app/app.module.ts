import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BiabookComponent } from './biabook/biabook.component';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './account/login/login.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { StarratingComponent } from './starrating/starrating.component';
import { RegisterComponent } from './account/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateRecipeComponent } from './createrecipe/createrecipe.component';
import { CreatereviewComponent } from './createreview/createreview.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipesadminComponent } from './admin/recipesadmin/recipesadmin.component';
import { UsersadminComponent } from './admin/usersadmin/usersadmin.component';

@NgModule({
  declarations: [														
    AppComponent,
      BiabookComponent,
      BreakfastComponent,
      NavComponent,
      LoginComponent,
      RecipelistComponent,
      CategoriesComponent,
      RecipedetailsComponent,
      RecommendationComponent,
      StarratingComponent,
      RegisterComponent,
      CreateRecipeComponent,
      CreatereviewComponent,
      FavouritesComponent,
      ShoppinglistComponent,
      RecipesadminComponent,
      UsersadminComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
