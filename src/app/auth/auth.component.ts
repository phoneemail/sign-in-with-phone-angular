import * as jose from 'jose';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  success = true;
  message = '';
  token = '';
  emailCount = '';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const phtoken = params['phtoken'];
      if (phtoken) {
        this.token = phtoken;
        this.verifyToken(phtoken);
        this.getEmailCount(phtoken);
      } else { this.router.navigate(['/']); }
    });
  }

  private getEmailCount(phtoken: string): void {
    const formData = new FormData();
    formData.append("merchant_phone_email_jwt", phtoken);
    this.http.post(environment.getEmailCountURl, formData, { responseType: 'text' }).subscribe((response: any) => {
      this.emailCount = response || "0"
    }, (...error) => { this.emailCount = "0" });
  }

  private verifyToken(phtoken: string): void {
    const secret = new TextEncoder().encode(environment.apiKey);
    jose.jwtVerify(phtoken, secret).then((response: any) => {
      this.message = `${response.payload['country_code']}${response.payload['phone_no']}`
    }).catch((...rest: any) => { this.success = false; this.message = "something went wrong"; });
  }
}
