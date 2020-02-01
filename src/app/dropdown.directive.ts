import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropDown]',

})
export class DropdownDirective
{
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleopen()
  {
    this.isOpen = !this.isOpen;
  }
  constructor() { }

}
