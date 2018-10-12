import { Recipe } from './../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from "./recipe.actions"
import * as fromApp from "../../store/app.reducers"

export interface FeatureState extends fromApp.AppState{
    recipes: State
}

export interface State {
    recipes : Recipe[]
}

const initialState: State = {
    recipes: [
        new Recipe("Rizek se zemakem", "solidne rizek", "http://media.igurmet.cz/cache/ae/4d/ae4dbbd2322cb635356c1792d880dc24.jpg", [new Ingredient("Zemaky", 3), new Ingredient("Strouhanka", 1)]),
        new Recipe("Rizek se zemakem", "solidne rizek", "https://recepty.cuketka.cz/media/recipe/main_imgs/rizek_z_kapra_2_2048_65.jpg", [new Ingredient("Mouka", 3), new Ingredient("Ryba", 3)])
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload] 
            }
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload ]
            }
        case (RecipeActions.UPDATE_RECIPE):
            return {
                ...state,
                recipes: state.recipes.map((recipe, index) => {
                    return index === action.payload.index ? {...recipe, ...action.payload.recipe} : recipe
                })
            }  
        case (RecipeActions.DELETE_RECIPE):
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload
                })
            } 
        default: return state        
    }
}