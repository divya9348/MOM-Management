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
  otp: string = '';
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
      console.log('employeeEmail', this.employeeEmail);

      sessionStorage.setItem('employeeEmail', this.employeeEmail);

      console.log("employeeemail:",response.employeeEmail)
      if (response.success) {         
        console.log('responce messAge:',response.success);
        this.router.navigate(['/throughOtp']);
        this.toastr.success("OTP sent successfully", 'Your OTP is: ' + response.otp);
      } else {
        this.toastr.error('You are not Registered!');
      }
    }, error => {
      console.log('error sending OTP', error);
      this.toastr.error('Error sending OTP. Please try again later.');
    });
  }

  navigateToSignIn() {
    this.router.navigate(['/signup']);
  }
}
