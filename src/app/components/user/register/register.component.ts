import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  showAlert = false;
  alertMsg = 'Please wait! Your account is being created';
  alertColor = 'blue';


  
constructor( private authService: AuthentificationService, private emailTaken: EmailTaken ){
    
     
}

inSubmission = false;

name=new FormControl('',[
  Validators.required,
  Validators.minLength(3)
])

email=new FormControl('',[
  Validators.email,
  Validators.required
],[this.emailTaken.validate])

age=new FormControl('',[
  Validators.required,
  Validators.min(18),
  Validators.max(120)
])

password=new FormControl('',[
  Validators.required,
  Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
])

confirm_password=new FormControl('', [Validators.required])

phoneNumber=new FormControl('',[
  Validators.required,
  Validators.minLength(9),
  Validators.maxLength(13),
])




registerForm = new FormGroup({
name: this.name,
email: this.email,
age: this.age,
password :this.password,
confirm_password: this.confirm_password,
phoneNumber: this.phoneNumber

},[RegisterValidators.match('password','confirm_password')]);

async register(){
  this.showAlert = true;
  this.alertMsg = 'Please wait! Your account is being created';
  this.alertColor = 'blue';
  this.inSubmission = true;

  const {email,password} = this.registerForm.value

   try{

  await this.authService.createuser(this.registerForm.value as User)
 
}catch(err){
    console.error(err)
    this.alertMsg = 'An unexpected error occurred. please try agin later';
    this.alertColor = 'red';
    this.inSubmission = false;

    return
 } 
    
  
 this.alertMsg = 'Succes! Your account has been created';
 this.alertColor = 'green';
 
  
}

/* checkError(controlName: string, error: string, touched: boolean): boolean | undefined {
  return touched ? this.registerForm .get(controlName)?.hasError(error) && this.registerForm .get(controlName)?.touched : this.registerForm .get(controlName)?.hasError(error);
} */


}
