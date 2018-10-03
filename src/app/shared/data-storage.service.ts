import { AuthService } from './../auth/auth.service';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http"
import { map, catchError } from "rxjs/operators"
import { throwError } from "rxjs";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn: "root"})

export class DataStorageService {
    constructor(private http: Http,
                private authService: AuthService) {}

    storeRecipes(recipes){
        const token = this.authService.getToken()
        return this.http.put("https://new-recipe-8b516.firebaseio.com/recipes.json?auth=" + token, recipes)
    }

    fetchRecipes(){
        const token = this.authService.getToken()
        return this.http.get("https://new-recipe-8b516.firebaseio.com/recipes.json?auth=" + token).pipe(
            map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json()
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
        this.http.put("https://new-recipe-8b516.firebaseio.com/ingredients.json?auth=" + token, ingredients).subscribe()
    }

    fetchIngredients(){
        const token = this.authService.getToken()
        return this.http.get("https://new-recipe-8b516.firebaseio.com/ingredients.json?auth=" + token).pipe(
            map((response: Response) => {
                const ingredients = response.json()
                return ingredients
            }),
            catchError((error: Response) => {
                return throwError("Failed to get the ingredients")
            })
        )
    }
}