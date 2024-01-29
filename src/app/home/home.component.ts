import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Properties to store environment variables
  countryCode = environment.countryCode;
  phoneNo = environment.phoneNo;
  redirectURL = environment.redirectURL;

  // Construct the login URL using environment variables
  loginURL = `https://www.phone.email/auth/sign-in?countrycode=${this.countryCode}&phone_no=${this.phoneNo}&redirect_url=${this.redirectURL}`;

  // Method to open the login window
  openLoginWindow() {
    window.open(
      this.loginURL,
      'peLoginWindow',
      'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=560,top=' +
      (screen.height - 600) / 2 +
      ',left=' +
      (screen.width - 500) / 2
    );
  }
}
