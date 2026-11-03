import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhasesComponent } from './create-phases.component';

describe('CreatePhasesComponent', () => {
  let component: CreatePhasesComponent;
  let fixture: ComponentFixture<CreatePhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePhasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
