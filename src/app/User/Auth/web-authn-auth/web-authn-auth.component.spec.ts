import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAuthnAuthComponent } from './web-authn-auth.component';

describe('WebAuthnAuthComponent', () => {
  let component: WebAuthnAuthComponent;
  let fixture: ComponentFixture<WebAuthnAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebAuthnAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebAuthnAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
