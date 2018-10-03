import { Recipe } from './../recipe.model';
import { Component, OnInit, HostListener } from '@angular/core';
import { ShoppingService } from '../../shopping-list/shopping.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  dropdownVisible = false;
  recipe: Recipe;
  id: number
  // @HostListener("document:click") onKlik() {
    
  // }
  

  constructor(private shoppingService: ShoppingService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"]
      this.recipe = this.recipeService.getRecipe(this.id)
    })

  }

  toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible
  }

  sendIngredients(){
    const recipeClone = JSON.parse(JSON.stringify(this.recipe))
    this.shoppingService.addIngredients(recipeClone.ingredients)
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
  }
}
