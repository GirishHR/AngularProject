import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipestartrComponent } from './recipestartr.component';

describe('RecipestartrComponent', () => {
  let component: RecipestartrComponent;
  let fixture: ComponentFixture<RecipestartrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipestartrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipestartrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
