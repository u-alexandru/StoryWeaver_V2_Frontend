import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-web-authn-auth',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './web-authn-auth.component.html',
  styleUrl: './web-authn-auth.component.css'
})
export class WebAuthnAuthComponent {

  canUseWebAuthn: Promise<boolean> = this.checkPasskeyAvailable();
  constructor() {
  }

  ngOnInit() {
  }
  async checkPasskeyAvailable(): Promise<boolean> {
    if (window.PublicKeyCredential &&
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
      PublicKeyCredential.isConditionalMediationAvailable) {
      // Check if user verifying platform authenticator is available.
      const results = await Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        PublicKeyCredential.isConditionalMediationAvailable(),
      ]);
      return results.every(r => r === true);
    }
    return Promise.resolve(false);
  }
}
