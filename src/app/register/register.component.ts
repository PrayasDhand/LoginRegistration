import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  
  constructor(private as:AuthService,private formBuilder: FormBuilder){
    this.registerForm = this.formBuilder.group({
     
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rpassword: ['', Validators.required],
      gender: ['', Validators.required],
    });

  }
  ngOnInit(): void {
      
  }
  

  registerSubmit(){
   let user:User = {
    id:0,
    firstname:this.registerForm.get('firstname')?.value,
    lastname:this.registerForm.get('lastname')?.value,
    email:this.registerForm.get('email')?.value,
    password:this.registerForm.get('password')?.value,
    rpassword:this.registerForm.get('rpassword')?.value,
    gender:this.registerForm.get('gender')?.value

   };
   this.as.signUp(user).subscribe({
    next:(res:any)=>{
      console.log(res);
    }
   })
    
    
  }

  get FirstName(): FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }
  get LastName(): FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get Password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  get Rpassword(): FormControl{
    return this.registerForm.get("rpassword") as FormControl;
  }
  get Gender(): FormControl{
    return this.registerForm.get("gender") as FormControl;
  }

}
