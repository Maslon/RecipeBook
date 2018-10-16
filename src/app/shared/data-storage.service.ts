import { AuthService } from './../auth/auth.service';
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators"
import { throwError } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: "root"})

export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private authService: AuthService) {}

    storeRecipes(recipes){
        // return this.httpClient.put("https://new-recipe-8b516.firebaseio.com/recipes.json", recipes, {
        //     observe: "body",
        //     params: new HttpParams().set("auth", token)
        //     // headers: new HttpHeaders().set("Authorization", "Bearer afassawf")
        // })
        const req = new HttpRequest("PUT", "https://new-recipe-8b516.firebaseio.com/recipes.json", recipes, {
            reportProgress: true
        })
        return this.httpClient.request(req)
    }

    fetchRecipes(){
        return this.httpClient.get<Recipe[]>("https://new-recipe-8b516.firebaseio.com/recipes.json").pipe(
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
        this.httpClient.put("https://new-recipe-8b516.firebaseio.com/ingredients.json", ingredients).subscribe()
    }

    fetchIngredients(){
        return this.httpClient.get<Ingredient[]>("https://new-recipe-8b516.firebaseio.com/ingredients.json").pipe(
            catchError((error: Response) => {
                return throwError("Failed to get the ingredients")
            })
        )
    }
}