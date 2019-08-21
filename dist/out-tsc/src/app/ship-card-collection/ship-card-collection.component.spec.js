import { async, TestBed } from '@angular/core/testing';
import { ShipCardCollectionComponent } from './ship-card-collection.component';
describe('ShipCardCollectionComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShipCardCollectionComponent]
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
//# sourceMappingURL=ship-card-collection.component.spec.js.map