import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/loginservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.component.html',
  styleUrls: ['./signup1.component.scss']
})
export class Signup1Component {
  isPasswordStep: boolean = false;
  employeeName: string= '';
  employeeEmail: string = '';
  phoneno:any;
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private loginservice: LoginserviceService, private toastr: ToastrService) { }


  // Method to handle the 'Continue' button click
  onContinue() {
    this.isPasswordStep = true;
  }

  // Method to handle the 'Register' button click
  onRegister() {
    this.loginservice.signup(this.employeeName, this.employeeEmail,this.phoneno ,this.password, this.confirmPassword).subscribe(
      response=>{
        this.toastr.success("Register Successfully", "Success");
        this.router.navigate(['/signup']);
    },
    // error => {
    //   this.toastr.error("Invalid User", 'Error');
    // }
  )}
}
