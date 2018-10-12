import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions } from "@ngrx/effects";

import * as RecipeActions from "../store/recipe.actions"
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { throwError } from 'rxjs';
import * as fromRecipe from './recipe.reducers';
import { Injectable } from '@angular/core';

@Injectable()

export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(
            switchMap(
                (action: RecipeActions.FetchRecipes) => {
                return this.httpClient.get<Recipe[]>("https://new-recipe-8b516.firebaseio.com/recipes.json")}
            ),
            map(
                (recipes) => {
                    for(let recipe of recipes){
                        if(!recipe["ingredients"]){
                            recipe["ingredients"] = []
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload: recipes
                    }
                }
            ),
            catchError((error: Response) => {
                return throwError("Failed to get the recipes")
            })                       
        )

    @Effect({dispatch: false})
    recipeStore = this.actions$
            .ofType(RecipeActions.STORE_RECIPES)
            .pipe(
                withLatestFrom(this.store.select("recipes")),
                switchMap(([action, state]) => {
                    const req = new HttpRequest("PUT", "https://new-recipe-8b516.firebaseio.com/recipes.json",
                    state.recipes, {
                    reportProgress: true
                    })
                return this.httpClient.request(req)
                })
            )
    
    constructor (private actions$: Actions,
                 private httpClient: HttpClient,
                 private store: Store<fromRecipe.FeatureState>) {}
}           