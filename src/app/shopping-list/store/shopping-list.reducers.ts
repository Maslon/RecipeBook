import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions"


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}


const initialState: State = {
    ingredients: [
        new Ingredient("Maso", 2),
        new Ingredient("Testoviny", 1)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}





export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: [...action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENT:                   
            const index = state.ingredients.findIndex((ing) => {
                return ing.name === action.payload.name
            })           
            if(index === -1){
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload]
                }
            } else {
                const ingredient = state.ingredients[index]
                ingredient.amount = state.ingredients[index].amount + action.payload.amount
                const ingredients = [...state.ingredients]
                ingredients[index] = ingredient
                return {
                    ...state,
                    ...ingredients
                }          
            }         
        case ShoppingListActions.ADD_INGREDIENTS:
            const consolidate = (ings) => {
                ings.forEach((ingredient, i) => {
                    for(let j = 0; j < ings.length; j++){
                        if(ingredient.name === ings[j].name && i !== j) {
                            ingredient.amount += ings[j].amount
                            ings.splice(j, 1)
                        }
                    }
                })
                return ings
            }
            const newIngredients = [...state.ingredients, ...action.payload]
            return {
                ...state,
                ingredients: consolidate(newIngredients)
            } 
        case ShoppingListActions.UPDATE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.map((ingredient, index) => {
                    return index === state.editedIngredientIndex ? {...ingredient, ...action.payload.ingredient} : ingredient
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            }    
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => {
                    return index !== state.editedIngredientIndex
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]}
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }       
        case ShoppingListActions.STOP_EDIT: 
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default: return state     
    }

    

}