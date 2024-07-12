import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireModifAuthorComponent } from './formulaire-modif-author.component';

describe('FormulaireModifAuthorComponent', () => {
  let component: FormulaireModifAuthorComponent;
  let fixture: ComponentFixture<FormulaireModifAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireModifAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireModifAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
