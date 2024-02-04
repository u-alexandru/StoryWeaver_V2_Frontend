import { Component } from '@angular/core';
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import { MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {NavSidebarService} from "../../../Services/Layout/nav-sidebar.service";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../../Services/Auth/auth.service";
import {LoginService} from "../../../Services/Auth/login.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NavbarService} from "../../../Services/Layout/Navbar/navbar.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatToolbar,
    MatIconModule,
    CommonModule,
    NgIf,
    MatProgressBarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
}
