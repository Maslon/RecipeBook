import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRecipe from "../store/recipe.reducers"
import { Observable } from 'rxjs';
import { take } from "rxjs/operators"
import * as RecipeActions from './../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  dropdownVisible = false;
  recipeState: Observable<fromRecipe.State>;
  id: number
  

  constructor(private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"]
      this.recipeState = this.store.select("recipes")
    })

  }

  toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible
  }

  sendIngredients(){
    this.store.select("recipes").pipe(
      take(1)
    ).subscribe((recipeState: fromRecipe.State) => {
      const recipeClone = JSON.parse(JSON.stringify(recipeState.recipes))
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeClone[this.id].ingredients))
    })
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    this.router.navigate(["/recipes"])
  }
}
