import { Subscription } from 'rxjs';
import { ShoppingService } from './shopping.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { faTrash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  selectedIngredient: Ingredient
  private subscription: Subscription
  faTrash = faTrash
  faCheckCircle = faCheckCircle
  faTimesCircle = faTimesCircle

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    console.log("shopping componenet initialized")
    this.ingredients = this.shoppingService.getIngredients()
    this.subscription = this.shoppingService.ingChanged.subscribe((ingredients) => {
      this.ingredients = ingredients
    })   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onIngredientSelect(index: number){
    this.shoppingService.selectedIngredient(index)
  }

  deleteIngredient(index){
    this.shoppingService.deleteIngredient(index)
  }

  checkIngredient(index){
    this.shoppingService.onCheckIngredient(index)
  }

  unCheckIngredient(index){
    this.shoppingService.onUnCheckIngredient(index)
  }
}
