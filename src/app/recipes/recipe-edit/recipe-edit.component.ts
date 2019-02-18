import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

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
              private recipeService: RecipeService,
              private router: Router) { }

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
      const recipe = this.recipeService.getRecipe(this.id)
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
  }

  getControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls
  }

  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    )
    if(this.editMode === false){
      this.recipeService.addRecipe(newRecipe)
      this.router.navigate(["/recipes"])
    } else {
      this.recipeService.updateRecipe(this.id, newRecipe)
      this.router.navigate([".."], {relativeTo: this.route})
    }
  }
}
