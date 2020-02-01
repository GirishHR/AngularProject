import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/Shoppinglist.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService
{
    recipeselected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('Test Recipe', 'simply a test', 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg', [new ingredient('fish', 2), new ingredient('bread', 2)]),
        new Recipe('Test Recipe', 'simply a test', 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg', [new ingredient('chicken', 2), new ingredient('meat', 2)])
    ];
    constructor(private shoppinglistservice: ShoppingListService) { }
    getRecipe()
    {
        return this.recipes.slice();
    }
    setRecipes(recipes: Recipe[])
    {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getItem(id: number)
    {
        return this.recipes[id];
    }
    addIngredientstoshoppinglist(ingredients: ingredient[])
    {
        this.shoppinglistservice.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe)
    {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    onUpdateRecipe(index: number, newrecipe: Recipe)
    {
        this.recipes[index] = newrecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    onDeleteRecipe(index: number)
    {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}