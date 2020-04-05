import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceLandingComponent } from './place-landing.component';

describe('PlaceLandingComponent', () => {
  let component: PlaceLandingComponent;
  let fixture: ComponentFixture<PlaceLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
