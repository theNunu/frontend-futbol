import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTournamentsComponent } from './form-tournaments.component';

describe('FormTournamentsComponent', () => {
  let component: FormTournamentsComponent;
  let fixture: ComponentFixture<FormTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTournamentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
