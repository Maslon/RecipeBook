import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from './../recipe.model';
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ShoppingService } from '../../shopping-list/shopping.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  dropdownVisible = false;
  recipe: Recipe;
  id: number;
  faCartPlus = faCartPlus

  

  constructor(private shoppingService: ShoppingService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private elRef: ElementRef) {}

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

  onSendIngredient(ingredient){
    const newIng = new Ingredient(ingredient.name, ingredient.amount)
    this.shoppingService.addIngredient(newIng)
  }

  @HostListener("document: click", ["$event"]) clickOutside() {
    if(!this.elRef.nativeElement.contains(event.target)){
      this.dropdownVisible = false
    }    
  }
}
