import { withLatestFrom } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import * as  fromApp from "../../store/app.reducers"
import * as ShoppingListActions from './shopping-list.actions';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { Ingredient } from '../../shared/ingredient.model';
import { throwError } from 'rxjs';

@Injectable()

export class ShoppingListEffects {
    @Effect()
    ingredientsFetch = this.actions$
        .ofType(ShoppingListActions.FETCH_INGREDIENTS)
        .pipe(
            switchMap(
                (action: ShoppingListActions.FetchIngredients) => {
                    return this.httpClient.get<Ingredient[]>("https://new-recipe-8b516.firebaseio.com/ingredients.json")
                }
            ),
            map((ingredients) => {
                return {
                    type: ShoppingListActions.SET_INGREDIENTS,
                    payload: ingredients
                }
            }),
            catchError((error: Response) => {
                return throwError("Failed to fetch the ingredients")
            })
        )
    @Effect({dispatch: false})
    ingredientsStore = this.actions$
            .ofType(ShoppingListActions.STORE_INGREDIENTS)
            .pipe(
                withLatestFrom(this.store.select("shoppingList")),
                switchMap(([action, state]) => {
                    const req = new HttpRequest("PUT", "https://new-recipe-8b516.firebaseio.com/ingredients.json", state.ingredients, {
                    reportProgress: true
                    })
                return this.httpClient.request(req)
                })
            )

    constructor (private actions$: Actions,
                 private httpClient: HttpClient,
                 private store: Store<fromApp.AppState>) {}    
}