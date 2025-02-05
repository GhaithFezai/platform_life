import { Component } from '@angular/core';

import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private s:ServiceService) {}
  onSubmit(): void {
    this.s.onSubmit(this.email,this.password,this.errorMessage);
  }



}
