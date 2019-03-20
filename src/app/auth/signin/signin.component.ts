import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: [
		'./signin.component.scss'
	]
})
export class SigninComponent implements OnInit, OnDestroy {
	err: string;
	errSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.errSub = this.authService.sendErr.subscribe(msg => (this.err = msg));
	}

	onSignIn(form: NgForm) {
		const email = form.value.email;
		const password = form.value.email;
		this.authService.signinUser(email, password);
	}

	ngOnDestroy() {
		this.errSub.unsubscribe();
	}
}
