import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email:'',
    password: ''
  }
  showAlert = false;
  alertMsg = 'Please wait! we are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth, private router:Router){}

  ngOnInit(): void {
    
  }

  async login(){

    this.showAlert = true;
    this.alertMsg = 'Please wait! we are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

 try{
  await this.auth.signInWithEmailAndPassword(
    this.credentials.email, this.credentials.password
  )

 }catch(err){
    this.inSubmission = false;
    this.alertMsg = 'An unexpected error occurred. Please try agin later'
    this.alertColor ='red';

  console.log(err);
    return
  }

  this.alertMsg = 'Success! You are now logged in.';
  this.alertColor = 'green';
  
  this.router.navigate(['home'])
  }

}
