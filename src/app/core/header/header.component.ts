import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ShoppingService } from '../../shopping-list/shopping.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faBars = faBars
  mobileNav = false;

  constructor(private recipeService: RecipeService,
              private shoppingService: ShoppingService,
              private authService: AuthService,
              private router: Router,
              private elRef: ElementRef) { }

  ngOnInit() {
  }

  onSaveData(){
    this.recipeService.storeRecipes()
    this.shoppingService.storeIngredients()
  }

  onFetchData(){
    this.recipeService.fetchRecipes()
    this.shoppingService.fetchIngredients()
  }

  onLogout(){
    this.authService.logout()
    this.router.navigate(["/"])
  }

  isAuthenticated(){
    return this.authService.isAuthenticated()
  }

  onMobileNav(){
    this.mobileNav = !this.mobileNav
  }

  close(event){
    console.log(event)
  }

  @HostListener("document: click", ["$event"]) clickOutside() {
    if(!this.elRef.nativeElement.contains(event.target)){
      this.mobileNav = false
    }    
  }

  onPageChange(){
    this.mobileNav = false
  }
}
