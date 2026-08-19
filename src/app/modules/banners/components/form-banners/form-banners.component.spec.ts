import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBannersComponent } from './form-banners.component';

describe('FormBannersComponent', () => {
  let component: FormBannersComponent;
  let fixture: ComponentFixture<FormBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBannersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
