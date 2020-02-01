import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBetterhighlight]'
})
export class BetterhighlightDirective
{


  constructor(private elementref: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void
  {
    // this.renderer.setStyle(this.elementref.nativeElement, 'background-color', 'blue');
  }
  @HostListener('mouseenter') mouseover(eventData: Event)
  {
    this.renderer.setStyle(this.elementref.nativeElement, 'background-color', 'blue');
  }
  @HostListener('mouseleave') mouseleave(eventData: Event)
  {
    this.renderer.setStyle(this.elementref.nativeElement, 'background-color', 'transparent');
  }
}

