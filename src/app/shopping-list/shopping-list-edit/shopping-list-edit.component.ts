import { Subscription } from 'rxjs';
import { ShoppingService } from './../shopping.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shopForm: NgForm
  editMode: boolean = false
  subscription: Subscription

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
   this.subscription =  this.shoppingService.editIngredient.subscribe((ingredient) => {
      this.shopForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      })
      this.editMode = true          
    })
  }

  onSubmit(){
    const name = this.shopForm.value.name
    const amount = this.shopForm.value.amount
    const newIngr = new Ingredient(name, amount)
    if(this.editMode === false){
      this.shoppingService.addIngredient(newIngr)
      this.shopForm.reset()
    } else {
      this.shoppingService.updateIngredient({name, amount})
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
      this.shoppingService.deleteIngredient()
      this.shopForm.reset()
      this.editMode = false
    }
  }

  onDeleteChecked(){
    this.shoppingService.deleteCheckedIngredients()
  }


  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  
}
