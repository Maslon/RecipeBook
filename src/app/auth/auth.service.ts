import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
	token: string;
	sendErr = new Subject<string>();

	constructor(private router: Router) {}

	signupUser(email: string, password: string) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(response => {
				this.router.navigate([
					'/'
				]);
				firebase.auth().currentUser.getIdToken().then((token: string) => (this.token = token));
			})
			.catch(error => {
				console.log(error);
				this.sendErr.next(error.message);
			});
	}

	signinUser(email: string, password: string) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(response => {
				this.router.navigate([
					'/'
				]);
				firebase.auth().currentUser.getIdToken().then((token: string) => (this.token = token));
			})
			.catch(error => {
				console.log(error);
				this.sendErr.next(error.message);
			});
	}

	logout() {
		firebase.auth().signOut();
		this.token = null;
	}

	getToken() {
		firebase.auth().currentUser.getIdToken().then((token: string) => (this.token = token));
		return this.token;
	}

	isAuthenticated() {
		return this.token != null;
	}

	loadUser() {
		firebase.auth().onAuthStateChanged(user => {
			if (user === null) {
				this.token = null;
			} else {
				user.getIdToken().then((token: string) => {
					this.token = token;
				});
			}
		});
	}
}
