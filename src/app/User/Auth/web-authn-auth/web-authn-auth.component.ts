import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgIf} from "@angular/common";
import {WebAuthnService} from "../../../Services/Auth/web-authn.service";
import {MatDivider, MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-web-authn-auth',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    AsyncPipe,
    MatDividerModule
  ],
  templateUrl: './web-authn-auth.component.html',
  styleUrl: './web-authn-auth.component.css'
})
export class WebAuthnAuthComponent {

  canUseWebAuthn: Promise<boolean>;
  constructor(private webAuthn: WebAuthnService) {
    this.canUseWebAuthn = webAuthn.checkPasskeyAvailable();
  }

  ngOnInit() {
  }

  authenticate() {
    this.webAuthn.startLogin().then(() => {
      console.log('Authentication started');
    }).catch(error => {
      console.error('Failed to start authentication', error);
    });
  }
}
