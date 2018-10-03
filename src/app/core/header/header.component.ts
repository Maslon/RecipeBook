import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ShoppingService } from '../../shopping-list/shopping.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService,
              private shoppingService: ShoppingService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSaveData(){
    this.recipeService.storeRecipes()
    this.shoppingService.storeIngredients()
  }

  onFetchData(){
    this.recipeService.fetchRecipes()
    this.shoppingService.fetchIngredients()
  }

  onLogout(){
    this.authService.logout()
    this.router.navigate(["/"])
  }

  isAuthenticated(){
    return this.authService.isAuthenticated()
  }

}
