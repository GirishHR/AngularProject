import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ingredient } from '../../../shared/ingredient.model';
import { ShoppingListService } from '../Shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit
{
  @ViewChild('f', { static: false }) slform: NgForm;
  subscription: Subscription;  
  editmode = false;
  editItemIndex: number;
  editedIngredient: ingredient;
  constructor(private shoppinglistservice: ShoppingListService) { }

  ngOnInit()
  {
    this.subscription = this.shoppinglistservice.startEditing.subscribe(
      (index: number) =>
      {
        this.editmode = true;
        this.editItemIndex = index;
        this.editedIngredient = this.shoppinglistservice.getIngredient(index);
        this.slform.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
    );
  }
  onSubmitItem(form: NgForm)
  {
    const value = form.value;
    const newIngredient = new ingredient(value.name, value.amount);
    if (this.editmode)
    {
      this.shoppinglistservice.updateIngredient(this.editItemIndex, newIngredient);
    }
    else
    {

      this.shoppinglistservice.addIngredient(newIngredient);
    }
    this.editmode = false;
    form.reset();
  }
  onClear()
  {
    this.editmode = false;
    this.slform.reset();
  }
  onDelete()
  {
    this.shoppinglistservice.deleteIngredient(this.editItemIndex);
    this.onClear();

  }
  ngOnDestroy()
  {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
