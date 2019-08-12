import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipCardCollectionComponent } from './ship-card-collection.component';

describe('ShipCardCollectionComponent', () => {
  let component: ShipCardCollectionComponent;
  let fixture: ComponentFixture<ShipCardCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipCardCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
