import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTournametsComponent } from './list-tournamets.component';

describe('ListTournametsComponent', () => {
  let component: ListTournametsComponent;
  let fixture: ComponentFixture<ListTournametsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTournametsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTournametsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
