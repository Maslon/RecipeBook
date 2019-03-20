import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: [
		'./recipe-list.component.scss'
	]
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[] = [];
	subscription: Subscription;
	err: string;

	constructor(
		private recipeService: RecipeService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
		this.subscription = this.recipeService.recipesChanged.subscribe(recipes => {
			this.recipes = recipes;
		});
	}

	onNewRecipe() {
		if (this.authService.token) {
			this.router.navigate(
				[
					'new'
				],
				{ relativeTo: this.route }
			);
		} else {
			this.err = 'Please LogIn to add new recipe';
		}
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
