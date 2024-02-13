import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {NavSidebarService} from "../../Services/Layout/nav-sidebar.service";
import {AuthService} from "../../Services/Auth/auth.service";
import {LoginService} from "../../Services/Auth/login.service";
import {NavbarService} from "../../Services/Layout/Navbar/navbar.service";
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
    AsyncPipe,
    MatProgressBar,
    NgIf,
    MatMenu,
    MatMenuItem,
    NgOptimizedImage,
    RouterLink,
    MatMenuTrigger,
    RouterOutlet,
  ]
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  sidebarOpened: boolean = false;
  // auth state observable
  isAuthenticated$ = this.authService.isAuthenticated$;
  isLoading$: boolean = false;
  constructor(private navSidebarService: NavSidebarService, private authService: AuthService, private loginService: LoginService, private navbarService: NavbarService) { }


  toggleSidebar() {
    this.navSidebarService.toggleSidebar();
  }

  logout() {
    this.loginService.logout().subscribe();
  }

  ngAfterViewInit() {
    this.navSidebarService.sidebarOpen$.subscribe(open => {
      this.sidebarOpened = open;
    });

    this.navbarService.isLoading$.subscribe((isLoading) => {
      this.isLoading$ = isLoading;
    });
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
