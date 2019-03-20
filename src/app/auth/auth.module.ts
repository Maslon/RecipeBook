import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		AuthRoutingModule
	]
})
export class AuthModule {}
