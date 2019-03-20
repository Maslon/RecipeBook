import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [
		'./signup.component.scss'
	]
})
export class SignupComponent implements OnInit, OnDestroy {
	errSub: Subscription;
	err: string;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.errSub = this.authService.sendErr.subscribe(msg => (this.err = msg));
		console.log(this.err);
	}

	onSignup(form: NgForm) {
		const email = form.value.email;
		const password = form.value.email;
		this.authService.signupUser(email, password);
	}

	ngOnDestroy() {
		this.errSub.unsubscribe();
	}
}
