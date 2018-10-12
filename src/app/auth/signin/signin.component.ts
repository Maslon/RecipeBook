import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from "../../store/app.reducers"
import * as AuthActions from "../store/auth.actions"


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email
    const password = form.value.email
    this.store.dispatch(new AuthActions.TryLogin({username: email, password: password}))
  }

}
