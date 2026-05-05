import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacePruebaComponent } from './face-prueba.component';

describe('FacePruebaComponent', () => {
  let component: FacePruebaComponent;
  let fixture: ComponentFixture<FacePruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacePruebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacePruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
