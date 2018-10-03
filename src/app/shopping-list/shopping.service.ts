import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})

export class ShoppingService {
    editIngredient = new Subject<Ingredient>()
    index: number;
    ingChanged = new Subject<Ingredient[]>()
    ingredients: Ingredient[] = [
        new Ingredient("Maso", 2),
        new Ingredient("Testoviny", 1)
    ];
    
    constructor(private router: Router,
                private dataStorage: DataStorageService) {}

    getIngredients(){
        return this.ingredients.slice()
    }

    addIngredient(ingredient: Ingredient){
        const index = this.ingredients.findIndex((ing) => {
            return ing.name === ingredient.name
        })
        if(index === -1){
            this.ingredients.push(ingredient)
            this.ingChanged.next(this.getIngredients())
        } else {
            this.ingredients[index].amount = this.ingredients[index].amount + ingredient.amount           
        }     
    }

    addIngredients(ingredients: Ingredient[]){
        ingredients.forEach(ing => this.addIngredient(ing))
        this.getIngredients()
    }

    selectedIngredient(index){
        this.index = index
        this.editIngredient.next(this.ingredients[index])
    }

    updateIngredient(ingredient){
        this.ingredients[this.index] = ingredient
        this.ingChanged.next(this.getIngredients())
    }

    deleteIngredient(){
        this.ingredients.splice(this.index, 1)
        this.ingChanged.next(this.getIngredients())
    }

    storeIngredients(){
        this.dataStorage.storeIngredients(this.ingredients)
    }

    fetchIngredients(){
        this.dataStorage.fetchIngredients().subscribe((ingredients) => {
            this.ingredients = ingredients
            this.ingChanged.next(this.getIngredients())
        },
        (error) => console.log(error)
        )
    }
}