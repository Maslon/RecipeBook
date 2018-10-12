import { Effect, Actions } from "@ngrx/effects"
import { Injectable } from "@angular/core";
import { map, switchMap, mergeMap, tap } from "rxjs/operators"
import * as firebase from "firebase"
import { from } from "rxjs"

import * as AuthActions from './auth.actions';
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects {
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_REGISTER)
        .pipe(
            map((action: AuthActions.TryRegister) => {
                return action.payload
            }),
            switchMap((authData: {username: string, password: string}) => {
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken())
            }),
            mergeMap((token: string) => {
                this.router.navigate(["/"])
                return [
                    {
                        type: AuthActions.REGISTER
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ]
            })
        )
    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_LOGIN)
        .pipe(
            map((action: AuthActions.TryRegister) => {
                return action.payload
            }),
            switchMap((authData: {username: string, password: string}) => {
                return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken())
            }),
            mergeMap((token: string) => {
                this.router.navigate(["/"])
                return [
                    {
                        type: AuthActions.LOGIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ]
            })
        )
    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(tap(() => {
            this.router.navigate(["/"])
        }))

    constructor(private actions$: Actions, private router: Router) {

    }
}