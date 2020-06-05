import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetLinkExpireComponent } from './reset-link-expire.component';

describe('ResetLinkExpireComponent', () => {
  let component: ResetLinkExpireComponent;
  let fixture: ComponentFixture<ResetLinkExpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetLinkExpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetLinkExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
