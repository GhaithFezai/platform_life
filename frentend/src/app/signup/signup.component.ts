import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private s:ServiceService) {}

  onSubmit(): void {
    this.s.onSubmit1(this.name,this.email,this.password);
  }
    



}
