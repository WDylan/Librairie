import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireModifBookComponent } from './formulaire-modif-book.component';

describe('FormulaireModifBookComponent', () => {
  let component: FormulaireModifBookComponent;
  let fixture: ComponentFixture<FormulaireModifBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireModifBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireModifBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
