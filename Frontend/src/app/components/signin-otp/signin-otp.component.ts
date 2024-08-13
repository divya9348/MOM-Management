import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin-otp',
  templateUrl: './signin-otp.component.html',
  styleUrls: ['./signin-otp.component.scss']
})
export class SigninOtpComponent {

  otpvalue1: string = '';
  otpvalue2: string = '';
  otpvalue3: string = '';
  otpvalue4: string = '';
  otpvalue5: string = '';
  otpvalue6: string = '';

  constructor(private router: Router, private loginservice: LoginserviceService, private toastr: ToastrService) { }

  otpVerified() {
    const enteredOTP = this.otpvalue1 + this.otpvalue2 + this.otpvalue3 + this.otpvalue4 + this.otpvalue5 + this.otpvalue6;
    const user = sessionStorage.getItem('employeeEmail');
    
    console.log("enterdotp", enteredOTP);
    if (!user) {
      alert('Email not found in session. Please try again.');
      return;
    }

    this.loginservice.verifyotp(user, enteredOTP).subscribe(
      (response: any) => {
        console.log(response.success);
        if (response.success) {
          this.toastr.success("Login Successful", "Success");
          this.router.navigate(['/homepage']);
        } else {
          this.toastr.error('OTP verification failed. Please try again.');
        }
      },
      (error) => {
        console.error('Error verifying OTP', error);
        this.toastr.error('Error verifying OTP. Please try again later.');
      }
    );
  }

  moveFocus(event: any, nextInput: string): void {
    const input = event.target as HTMLInputElement;
    const maxLength = parseInt(input.maxLength.toString(), 10);

    const currentLength = input.value.length;

    if (currentLength >= maxLength) {
      const element = document.getElementsByName(nextInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  }

  moveBack(event: KeyboardEvent, prevInput: string, currentInput?: string): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 0) {
      const element = document.getElementsByName(prevInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
        if (currentInput) {
          currentInput = ''; // Clear the current input value
        }
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
