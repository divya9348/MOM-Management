import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/loginservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  employeeName: string = '';
  employeeEmail: string = '';
  phoneno: any;
  password: string = '';
  confirmPassword: string = '';
  employeeID: string = '';

  employees: any[] = [];  // Array to hold the employee data
  itemsPerPage: number = 4;
  p: number = 1;
  totalCount: number = 0; // Variable to hold the total count of employees

  searchKey: string = '';
  start: number = 0;
  end: number = 0;

  rowsPerPageOptions: number[] = [5, 10, 15, 20, 25, 30];
  selectedRowsPerPage: number = this.rowsPerPageOptions[0]; // default value

  constructor(private router: Router, private loginservice: LoginserviceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listEmployee();
  }

  // Check if the form is valid before submission
  isFormValid(): boolean {
    if (!this.employeeName.trim()) {
      this.toastr.error("Employee Name is required.", "Error");
      return false;
    }

    if (!this.employeeEmail.trim()) {
      this.toastr.error("Employee Email is required.", "Error");
      return false;
    }

    if (!this.phoneno) {
      this.toastr.error("Phone Number is required.", "Error");
      return false;
    }

    if (!this.password.trim()) {
      this.toastr.error("Password is required.", "Error");
      return false;
    }

    if (!this.confirmPassword.trim()) {
      this.toastr.error("Confirm Password is required.", "Error");
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error("Passwords do not match.", "Error");
      return false;
    }

    if (!this.employeeID.trim()) {
      this.toastr.error("Employee ID is required.", "Error");
      return false;
    }

    return true;
  }

  onRegister() {
    // Only proceed if the form is valid
    if (this.isFormValid()) {
      // Check if the employee is already present
      this.loginservice.checkEmployeeExists(this.employeeEmail, this.employeeID).subscribe(
        (exists: boolean) => {
          if (exists) {
            this.toastr.warning("Employee already added", "Warning");
          } else {
            // Proceed with creating the employee if not already present
            this.loginservice.createdByAdmin(this.employeeName, this.employeeEmail, this.phoneno, this.password, this.confirmPassword, this.employeeID).subscribe(
              response => {
                this.toastr.success("Added in the List.", "Success");
                this.listEmployee();
              },
              error => {
                this.toastr.error("Failed to add employee", "Error");
              }
            );
          }
        },
        error => {
          this.toastr.error("Failed to check employee existence", "Error");
        }
      );
    }
  }
  

  listEmployee() {
    this.loginservice.listEmpByAdmin(this.searchKey).subscribe(
      (response: any) => {
        if (response.result && response.result.totalCount > 0) {
          this.employees = response.result.employees;
          this.totalCount = response.result.totalCount;
        } else {
          this.employees = [];
          this.totalCount = 0;
        }
        this.updatePagination();
      },
      (error: any) => {
        this.toastr.error("Failed to load employee data", "Error");
      }
    );
  }

  onSearchChange(searchValue: string): void {
    this.searchKey = searchValue;
    this.listEmployee();
  }

  updatePagination() {
    this.start = (this.p - 1) * this.itemsPerPage + 1;
    this.end = Math.min(this.p * this.itemsPerPage, this.totalCount);
  }

  pageChange(page: number) {
    this.p = page;
    this.updatePagination();
  }
}
