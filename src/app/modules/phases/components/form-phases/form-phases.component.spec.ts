import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPhasesComponent } from './form-phases.component';

describe('FormPhasesComponent', () => {
  let component: FormPhasesComponent;
  let fixture: ComponentFixture<FormPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPhasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
