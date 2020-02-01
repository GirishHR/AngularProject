import { Component, OnInit } from '@angular/core';
import { ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './Shoppinglist.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit
{
  ingredients: ingredient[];
  constructor(private shoppinglistservice: ShoppingListService) { }

  ngOnInit()
  {
    this.ingredients = this.shoppinglistservice.getIngredients();
    this.shoppinglistservice.ingredientschanged.subscribe((ingredients: ingredient[]) =>
    {
      this.ingredients = ingredients;
    });
  }

  onEditItem(index: number)
  {
    this.shoppinglistservice.startEditing.next(index);
  }


}
