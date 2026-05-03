import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleStateComponent } from './toggle-state.component';

describe('ToggleStateComponent', () => {
  let component: ToggleStateComponent;
  let fixture: ComponentFixture<ToggleStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
