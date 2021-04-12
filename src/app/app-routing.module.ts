import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { LoginComponent } from './account/login/login.component';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { BiabookComponent } from './biabook/biabook.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { RegisterComponent } from './account/register/register.component';
import { CreatereviewComponent } from './createreview/createreview.component';
import { CreateRecipeComponent } from './createrecipe/createrecipe.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipesadminComponent } from './admin/recipesadmin/recipesadmin.component';
import { UsersadminComponent } from './admin/usersadmin/usersadmin.component';

const routes: Routes = [
  {path: 'biabook', component: BiabookComponent},
  {path: 'breakfast', component: BreakfastComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recipelist', component: RecipelistComponent},
  {path: 'recipe/:id', component: RecipedetailsComponent},
  {path: 'create-review/:id', component: CreatereviewComponent, canActivate: [AuthGuard]},
  {path: 'create-recipe', component: CreateRecipeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'favourites', component: FavouritesComponent}, 
  {path: 'shoppinglist', component: ShoppinglistComponent},
  {path: 'admin/recipes', component: RecipesadminComponent, canActivate: [AuthGuard]},
  {path: 'admin/users', component: UsersadminComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: BiabookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
