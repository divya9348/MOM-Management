import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/loginservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  employeeEmail: string = '';
  isemployeeEmailEmpty: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, private loginservice: LoginserviceService) {}

  getOtp() {
    if (!this.employeeEmail) {
      this.isemployeeEmailEmpty = true;
      this.toastr.error("Email is required. Please enter your email.");
      return;
    }
    this.isemployeeEmailEmpty = false;  // Reset the flag if email is provided

    this.loginservice.sendOtp(this.employeeEmail).subscribe((response: any) => {

      sessionStorage.setItem('employeeEmail', this.employeeEmail);

      if (response.success) {         
         this.router.navigate(['/verifyotp']);
        this.toastr.success("OTP sent successfully", 'Your OTP is: ' + response.otp);
      } else {
        this.toastr.error('You are not Registered!');
      }
    }, error => {
      this.toastr.error('Error sending OTP. Please try again later.');
    });
  }

  navigateToSignIn() {
    this.router.navigate(['/']);
  }
}
