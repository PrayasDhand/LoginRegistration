import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private as:AuthService,private formBuilder: FormBuilder){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]], 
    });
    

  }
  ngOnInit(): void {
      
  }
  loginSubmit(){
    let loginInfo = {
      email:this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.as.login(loginInfo).subscribe({
      next: (res:any)=>{
        console.log(res);
       this.as.setToken(res);

      }
    })
    console.log(this.loginForm);
  }

  

  get Email(): FormControl{
    return this.loginForm.get("email") as FormControl;
  }
  get Password(): FormControl{
    return this.loginForm.get("password") as FormControl;
}
}
