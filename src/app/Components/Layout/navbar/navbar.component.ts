import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import { MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {NavSidebarService} from "../../../Services/Layout/nav-sidebar.service";
import {MatIconModule} from "@angular/material/icon";

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
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  sidebarOpened: boolean = false;
  constructor(private navSidebarService: NavSidebarService) { }

  toggleSidebar() {
    this.navSidebarService.toggleSidebar();
  }

  ngAfterViewInit() {
    this.navSidebarService.sidebarOpen$.subscribe(open => {
      this.sidebarOpened = open;
    });
  }
}
