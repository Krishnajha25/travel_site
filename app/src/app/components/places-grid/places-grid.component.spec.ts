import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesGridComponent } from './places-grid.component';

describe('PlacesGridComponent', () => {
  let component: PlacesGridComponent;
  let fixture: ComponentFixture<PlacesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
