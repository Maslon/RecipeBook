import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBRNQ0XFZUVLF4Sxx4TIfBwNZkpOQr1QvE",
      authDomain: "new-recipe-8b516.firebaseapp.com"
    })

  }
}
