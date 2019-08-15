import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPopComponent } from './spinner-pop.component';

describe('SpinnerPopComponent', () => {
  let component: SpinnerPopComponent;
  let fixture: ComponentFixture<SpinnerPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
