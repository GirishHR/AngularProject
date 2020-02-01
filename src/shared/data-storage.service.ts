import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http } from '@angular/http';
import { RecipeService } from '../app/recipes/recipe.service';
import { Recipe } from '../app/recipes/recipe.model';

@Injectable()
export class DataStorageServices
{
    constructor(private http: Http, private recipeservice: RecipeService)
    {

    }

    storerecipes()
    {
        return this.http.put('https://angular-project-fced4.firebaseio.com/recipes.json', this.recipeservice.getRecipe());
    }

    getrecipes()
    {
        return this.http.get('https://angular-project-fced4.firebaseio.com/recipes.json')
            // .map(
            //     (response: Response) =>
            //     {
            //         const recipes: Recipe[] = response.json();
            //         for (let recipe of recipes)
            //         {
            //             if (!recipe['ingredients'])
            //             {
            //                 recipe['ingredients'] = [];
            //             }
            //         }
            //         return recipes;
            //     }
            // )
            .subscribe(
                (response: Response) =>
                {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes)
                    {
                        if (!recipe['ingredients'])
                        {
                            console.log("hai this is inside recipe ingredients");
                            recipe['ingredients'] = [];
                        }
                    }
                    this.recipeservice.setRecipes(recipes);
                }
            );
    }
}