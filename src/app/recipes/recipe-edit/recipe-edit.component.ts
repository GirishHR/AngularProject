import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormControlName, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit
{
  id: number;
  editmode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeservice: RecipeService, private router: Router) { }

  ngOnInit()
  {
    this.route.params.subscribe(
      (params: Params) =>
      {
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.initForm();
      }
    )

  }
  addIngredient()
  {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  private initForm()
  {

    let recipeName = '';
    let imagepath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if (this.editmode)
    {
      const recipe = this.recipeservice.getItem(this.id);
      recipeName = recipe.name;
      imagepath = recipe.imagepath;
      description = recipe.description;
      if (recipe['ingredients'])
      {
        for (let ingredients of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredients.name, Validators.required),
              'amount': new FormControl(ingredients.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagepath': new FormControl(imagepath, Validators.required),
      'description': new FormControl(description),
      'ingredients': recipeIngredients
    });

  }
  onClear()
  {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit()
  {
    if (this.editmode)
    {
      this.recipeservice.onUpdateRecipe(this.id, this.recipeForm.value);
    }
    else
    {
      this.recipeservice.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number)
  {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }

}
