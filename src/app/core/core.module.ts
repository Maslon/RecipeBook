import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ]
})

export class CoreModule{

}