
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isloggedIn(){
    return !!localStorage.getItem("admin_name")
  }
}