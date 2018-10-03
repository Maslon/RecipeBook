import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn: "root"})

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()
    private recipes: Recipe[] = [
        new Recipe("Rizek se zemakem", "solidne rizek", "http://media.igurmet.cz/cache/ae/4d/ae4dbbd2322cb635356c1792d880dc24.jpg", [new Ingredient("Zemaky", 3), new Ingredient("Strouhanka", 1)]),
        new Recipe("Rizek se zemakem", "solidne rizek", "https://recepty.cuketka.cz/media/recipe/main_imgs/rizek_z_kapra_2_2048_65.jpg", [new Ingredient("Mouka", 3), new Ingredient("Ryba", 3)])
    ]

    constructor(private storageService: DataStorageService){}

    getRecipes(){
        return this.recipes.slice()
    }

    getRecipe(id: number){
        return this.recipes[id]
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.getRecipes())
    }

    updateRecipe(id, newRecipe){
        this.recipes[id] = newRecipe
        console.log(this.recipes)
        this.recipesChanged.next(this.getRecipes())
    }

    deleteRecipe(id){
        this.recipes.splice(id, 1)
        this.recipesChanged.next(this.getRecipes())
    }

    storeRecipes(){
        this.storageService.storeRecipes(this.recipes).subscribe(
            (response) => console.log(response)
        )
    }

    fetchRecipes(){
        this.storageService.fetchRecipes().subscribe(
            (recipes) => {
                this.recipes = recipes
                this.recipesChanged.next(this.getRecipes())
            },
            (error) => console.log(error)
             
        )
        
    }
}