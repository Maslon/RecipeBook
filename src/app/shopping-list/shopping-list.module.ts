import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent    
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})

export class ShoppingListModule {

}