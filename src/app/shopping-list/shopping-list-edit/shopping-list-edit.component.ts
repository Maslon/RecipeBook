import * as ShoppingListActions from './../store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from "../../store/app.reducers" 

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shopForm: NgForm
  editMode: boolean = false
  subscription: Subscription
  editedItem: Ingredient

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select("shoppingList").subscribe((data) => {
      if(data.editedIngredientIndex > -1){
        this.editedItem = data.editedIngredient
        this.editMode = true
        this.shopForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false
      }
    }) 
  }


  onSubmit(){
    const name = this.shopForm.value.name
    const amount = this.shopForm.value.amount
    const newIngredient = new Ingredient(name, amount)
    if(this.editMode === false){
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
      this.shopForm.reset()
    } else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
      this.shopForm.reset()
      this.editMode = false
    }
  }

  onClear(){
    this.shopForm.reset()
    this.editMode = false
  }

  onDelete(){
    if(this.editMode === true) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredient())
      this.shopForm.reset()
      this.editMode = false
    }
  }

  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit())
    this.subscription.unsubscribe()
  }

}
