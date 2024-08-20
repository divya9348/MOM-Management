import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private apiUrl = "http://localhost:4000"; // Ensure this matches your backend URL

  constructor(private http: HttpClient) { }

  createdByAdmin(employeeName:string, employeeEmail:string, phoneno:number, password:string, confirmPassword:string,employeeID:string){
    return this.http.post<any>(`${this.apiUrl}/employee/createdByAdmin`,{ employeeName, employeeEmail, phoneno, password, confirmPassword,employeeID });
  }

  listEmpByAdmin(searchKey: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employee/Adminlistemployee`, {params: { searchKey }});
  }

  signup(employeeName:string, employeeEmail:string, phoneno:number, password:string, confirmPassword:string){
    return this.http.post<any>(`${this.apiUrl}/employee/create`,{ employeeName, employeeEmail, phoneno, password, confirmPassword });
  }

  login(employeeEmail: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, { employeeEmail, password });
  }

  sendOtp(employeeEmail:String):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/getOtp`,{ employeeEmail });
  }

  verifyotp(employeeEmail:string, otp:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/verifyOtp`,{ employeeEmail, otp });
  }

  checkEmployeeExists(employeeEmail: string, employeeID: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/employee/check-exists`, { employeeEmail, employeeID });
  }
}