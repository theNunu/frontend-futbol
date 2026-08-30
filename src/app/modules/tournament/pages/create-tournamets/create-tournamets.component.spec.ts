import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTournametsComponent } from './create-tournamets.component';

describe('CreateTournametsComponent', () => {
  let component: CreateTournametsComponent;
  let fixture: ComponentFixture<CreateTournametsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTournametsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTournametsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
