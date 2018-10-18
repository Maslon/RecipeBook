import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './../shared/auth.interceptor';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FontAwesomeModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ]
})

export class CoreModule{

}