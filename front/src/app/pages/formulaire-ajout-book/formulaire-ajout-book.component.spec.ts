import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireAjoutBookComponent } from './formulaire-ajout-book.component';

describe('FormulaireAjoutBookComponent', () => {
  let component: FormulaireAjoutBookComponent;
  let fixture: ComponentFixture<FormulaireAjoutBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireAjoutBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireAjoutBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
