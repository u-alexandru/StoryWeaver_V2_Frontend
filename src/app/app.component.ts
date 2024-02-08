import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./Components/Layout/sidebar/sidebar.component";
import {NavbarComponent} from "./Components/Layout/navbar/navbar.component";
import {AuthService} from "./Services/Auth/auth.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { Subscription} from "rxjs";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StoryWeaver_V2_Frontend';
  private authCheckSubscription: Subscription | undefined;
  private authCheckStateSubscription: Subscription | undefined;
  checkingAuth = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {

    this.authCheckSubscription = this.authService.checkAuthentication().subscribe();

    this.authCheckStateSubscription = this.authService.checkingAuth$.subscribe({
      next: (checkingAuth) => {
        console.log('checkingAuth', checkingAuth)
        this.checkingAuth = checkingAuth;
      }
    });
  }

  ngOnDestroy() {
    if (this.authCheckSubscription) {
      this.authCheckSubscription.unsubscribe();
    }
    if (this.authCheckStateSubscription) {
      this.authCheckStateSubscription.unsubscribe();
    }
  }

}
