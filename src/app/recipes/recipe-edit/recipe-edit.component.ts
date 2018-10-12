import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as RecipeActions from "../store/recipe.actions"
import * as fromRecipe from "../store/recipe.reducers"
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false
  recipeForm: FormGroup
  imagePath: string

  constructor(private route: ActivatedRoute,
              private router: Router,
              private  store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"]
      this.editMode = params["id"] ? true : false
      this.initForm()
    })
  }

  private initForm(){
    let recipeName = ""
    let imgPath = ""
    let desc = ""
    let ings = new FormArray([])

    if(this.editMode){
      this.store.select("recipes").pipe(
        take(1)
      ).subscribe((recipeState: fromRecipe.State) => {
        const recipe = recipeState.recipes[this.id]
        recipeName = recipe.name
        imgPath = recipe.imagePath
        desc = recipe.description
        if(recipe["ingredients"]){
          for (let ingredient of recipe.ingredients){
            ings.push(new FormGroup({
              "name": new FormControl(ingredient.name, Validators.required),
              "amount": new FormControl(ingredient.amount, 
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }))
          }
        }
      })
      
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(imgPath, Validators.required),
      "description": new FormControl(desc, Validators.required),
      "ingredients": ings
    })
  }

  onAddIngredient(){
    const group = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get("ingredients")).push(group)
  }

  onDeleteIngredient(index){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index)
    console.log(this.imagePath)
  }

  getControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls
  }

  onSubmit(){
    if(this.editMode){
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, recipe: this.recipeForm.value}))
      this.router.navigate(["/recipes"])
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value))
      this.router.navigate([".."], {relativeTo: this.route})
    }
  }
}
