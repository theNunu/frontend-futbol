import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeasonsComponent } from './form-seasons.component';

describe('FormSeasonsComponent', () => {
  let component: FormSeasonsComponent;
  let fixture: ComponentFixture<FormSeasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSeasonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
