import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {

  options: PublicKeyCredentialCreationOptions | undefined;
  constructor(private http: HttpClient) {

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

  async startRegistration(email: string): Promise<void> {
    this.options = await this.getCredentialCreationOptions(email);
    console.log('options', this.options);
    if (!this.options) {
      throw new Error('Failed to get credential creation options from server');
    }

    const credential = await navigator.credentials.create({ publicKey: this.options });
    console.log('credential', credential);

    // get existing credentials if present
    console.log('navigator.credentials.get', await navigator.credentials.get());
    if (!credential) {
      throw new Error('Failed to create public key credential');
    }
  }
  async getCredentialCreationOptions(email:string): Promise<PublicKeyCredentialCreationOptions> {
    const options = await firstValueFrom(this.http.post<PublicKeyCredentialCreationOptions>('/api/webauthn/register', {username: email}));

    // Convert challenge from hexadecimal string to ArrayBuffer
    options.challenge = this.hexStringToBuffer(options.challenge);
    options.user.id = this.hexStringToBuffer(options.user.id);
    return options;
  }

  hexStringToBuffer(hex: any): ArrayBuffer {
    const buffer = new Uint8Array(hex.length / 2);

    for (let i = 0; i < hex.length; i += 2) {
      buffer[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }

    return buffer.buffer;
  }
}
