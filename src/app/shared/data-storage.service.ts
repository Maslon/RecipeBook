import { AuthService } from './../auth/auth.service';
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators"
import { throwError } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { HttpClient } from '@angular/common/http';
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: "root"})

export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private authService: AuthService) {}

    storeRecipes(recipes){
        const token = this.authService.getToken()
        return this.httpClient.put("https://new-recipe-8b516.firebaseio.com/recipes.json?auth=" + token, recipes)
    }

    fetchRecipes(){
        const token = this.authService.getToken()
        return this.httpClient.get<Recipe[]>("https://new-recipe-8b516.firebaseio.com/recipes.json?auth=" + token).pipe(
            map(
                (recipes) => {
                    for(let recipe of recipes){
                        if(!recipe["ingredients"]){
                            recipe["ingredients"] = []
                        }
                    }
                    return recipes
                }
            ),
            catchError((error: Response) => {
                return throwError("Failed to get the recipes")
            })
        )
    }

    storeIngredients(ingredients){
        const token = this.authService.getToken()
        this.httpClient.put("https://new-recipe-8b516.firebaseio.com/ingredients.json?auth=" + token, ingredients).subscribe()
    }

    fetchIngredients(){
        const token = this.authService.getToken()
        return this.httpClient.get<Ingredient[]>("https://new-recipe-8b516.firebaseio.com/ingredients.json?auth=" + token).pipe(
            catchError((error: Response) => {
                return throwError("Failed to get the ingredients")
            })
        )
    }
}