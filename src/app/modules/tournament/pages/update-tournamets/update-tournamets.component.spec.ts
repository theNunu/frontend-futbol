import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTournametsComponent } from './update-tournamets.component';

describe('UpdateTournametsComponent', () => {
  let component: UpdateTournametsComponent;
  let fixture: ComponentFixture<UpdateTournametsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTournametsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTournametsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
