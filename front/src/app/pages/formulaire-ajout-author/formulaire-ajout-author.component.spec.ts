import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireAjoutAuthorComponent } from './formulaire-ajout-author.component';

describe('FormulaireAjoutAuthorComponent', () => {
  let component: FormulaireAjoutAuthorComponent;
  let fixture: ComponentFixture<FormulaireAjoutAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireAjoutAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireAjoutAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
