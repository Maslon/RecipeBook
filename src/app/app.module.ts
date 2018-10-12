import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/app.reducers"
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreRouterConnectingModule } from "@ngrx/router-store"
import { StoreDevtoolsModule } from "@ngrx/store-devtools"
import { environment } from "./../environments/environment"
import { ShoppingListEffects } from './shopping-list/store/shopping-list.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Universal
    BrowserModule.withServerTransition({appId: "recipe-app-app"}),
    
    HttpClientModule,
    FormsModule,
    ShoppingListModule,
    AuthModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ShoppingListEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
