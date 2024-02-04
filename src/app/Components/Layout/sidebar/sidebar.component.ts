import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule
} from "@angular/material/sidenav";

import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NavSidebarService} from "../../../Services/Layout/nav-sidebar.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenavModule,
    MatSidenavContent,
    FormsModule,
    MatDrawerContainer,
    MatButtonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // get reference to #drawer
  @ViewChild('drawer') drawer!: MatSidenav;
  constructor(private navSidebarService: NavSidebarService) { }

  ngAfterViewInit() {
    this.navSidebarService.sidebarOpen$.subscribe(open => {
      if (open) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    });
  }
}
