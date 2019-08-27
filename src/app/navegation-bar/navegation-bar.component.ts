import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navegation-bar',
  templateUrl: './navegation-bar.component.html',
  styleUrls: ['./navegation-bar.component.scss']
})
export class NavegationBarComponent {
  // @ViewChild(drawer) drawer: drawer;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthService) { }

  onLogout() {
    this.auth.logOut();
    this.isHandset$.subscribe(response => {
      if (response) {
        //  drawer.toggle();
      }
    });
  }
}
