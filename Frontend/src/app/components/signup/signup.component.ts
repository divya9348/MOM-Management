import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/loginservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  employeeEmail: string = '';
  password: string = '';

  constructor(private router: Router, private loginservice: LoginserviceService, private toastr: ToastrService) { }

  myloginData() {
    this.loginservice.login(this.employeeEmail, this.password).subscribe(
      response => {
       
          this.toastr.success("Login Successful", "Success");
          this.router.navigate(['/homepage']);
      },
      error => {
        // this.message = 'An error occurred';
        this.toastr.error("Invalid User", 'Error');
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }

  navigateToSignup(){
    this.router.navigate(['/signup1'])
  }
}
