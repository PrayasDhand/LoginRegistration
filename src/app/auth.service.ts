import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/models';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient) { }
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseUrl = "http://localhost:5229/api/";
  jwtHelperService = new JwtHelperService();

  signUp(user: User){
   return this.http.post(this.baseUrl + "User/CreateUser",user,{
    
    responseType:'text',
   });
  }

  login(loginInfo:any){
    let params = new HttpParams()
    .append('email',loginInfo.email)
    .append('password',loginInfo.password);
    return this.http.get(this.baseUrl + "User/LoginUser",{
      params: params,
      responseType:'text',
    });
  }
  setToken(token:string){
    localStorage.setItem("access_token",token);

  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token):null;
  }
}
