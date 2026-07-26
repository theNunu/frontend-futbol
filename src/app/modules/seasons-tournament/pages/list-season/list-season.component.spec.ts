import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeasonComponent } from './list-season.component';

describe('ListSeasonComponent', () => {
  let component: ListSeasonComponent;
  let fixture: ComponentFixture<ListSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSeasonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
