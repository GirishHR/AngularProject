import { ingredient } from '../../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService
{
    ingredientschanged = new EventEmitter<ingredient[]>();
    startEditing = new Subject<number>();
    ingredients: ingredient[] = [
        new ingredient('Apple', 5),
        new ingredient('orange', 6)
    ];

    getIngredients()
    {
        return this.ingredients.slice();
    }
    getIngredient(index: number)
    {
        return this.ingredients[index];
    }

    addIngredient(ingredient: ingredient)
    {
        this.ingredients.push(ingredient);
        this.ingredientschanged.emit(this.ingredients.slice());
    }
    addIngredients(ingredients: ingredient[])
    {
        this.ingredients.push(...ingredients);
        this.ingredientschanged.emit(this.ingredients.slice());
    }
    updateIngredient(index: number, newIngredient: ingredient)
    {
        this.ingredients[index] = newIngredient;
        this.ingredientschanged.emit(this.ingredients.slice());
    }
    deleteIngredient(index: number)
    {
        this.ingredients.splice(index, 1);
        this.ingredientschanged.emit(this.ingredients.slice());
    }
}