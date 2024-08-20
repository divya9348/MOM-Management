import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninOtpComponent } from './components/signin-otp/signin-otp.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { Signup1Component } from './components/signup1/signup1.component';

const routes: Routes =
  [
    { path: '', component: SignupComponent },   //Login Through Password...........
    { path: 'loginthroughotp', component: LoginComponent },
    { path: 'verifyotp', component: SigninOtpComponent },
    { path: 'signup', component: Signup1Component },
    { path: 'homepage', component: HomepageComponent },
    { path: '', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
