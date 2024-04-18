import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  accessToken: string = "";
  hasToken: boolean = false;
  errorMessage: string = "";
  CLIENT_ID: string = "***********************";
  userDetails = {
    countryCode: "",
    phoneNo: ""
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.accessToken = params['access_token'];
      if (this.accessToken) {
        this.hasToken = true;
        this.httpRequest();
      }
    });
  }

  httpRequest() {
    const url = "https://eapi.phone.email/getuser";
    const data = new FormData();

    data.append("access_token", this.accessToken);
    data.append("client_id", this.CLIENT_ID);

    this.http.post(url, data, { responseType: 'json' }).subscribe((response: any) => {
      this.userDetails = {
        countryCode: response.country_code,
        phoneNo: response.phone_no,
      };
    }, ({ message }: { message: string }) => { this.errorMessage = message });
  }

  openAuthWindow() {
    const REDIRECT_URL = window.location.href;
    const AUTH_URL = `https://www.phone.email/auth/log-in?client_id=${this.CLIENT_ID}&redirect_url=${REDIRECT_URL}`;
    window.open(AUTH_URL, 'peLoginWindow', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=560,top=' + (window.screen.height - 600) / 2 + ',left=' + (window.screen.width - 500) / 2);
  }

  handleBack() {
    this.accessToken = "";
    this.hasToken = false;
    this.router.navigate(['/']);
  }
}
