import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from "../../store/app.reducers"
import * as AuthActions from "../store/auth.actions"
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email
    const password = form.value.email
    this.store.dispatch(new AuthActions.TryRegister({username: email, password: password}))
  }

}
