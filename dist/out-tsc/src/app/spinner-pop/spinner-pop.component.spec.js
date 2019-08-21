import { async, TestBed } from '@angular/core/testing';
import { SpinnerPopComponent } from './spinner-pop.component';
describe('SpinnerPopComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpinnerPopComponent]
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
//# sourceMappingURL=spinner-pop.component.spec.js.map