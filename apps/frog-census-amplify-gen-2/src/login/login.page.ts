import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import outputs from '../../../../amplify_outputs.json';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, RouterOutlet]
})
export class LoginComponent {
    constructor(private authenticatorService: AuthenticatorService) {
        Amplify.configure(outputs);
    }
}
