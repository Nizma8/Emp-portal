import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../Module/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

base_url:string="http://localhost:3000"


  constructor(private http:HttpClient) { }
  //get admin details
  adminDetails(){
    //api call to http://localhost:3000
    return this.http.get(`${this.base_url}/users/1`)
  }

  //getallusers
  getallusers(){
     //api call to http://localhost:3000/users
     return this.http.get(`${this.base_url}/users`)
  }

  addUser(user:UserSchema){
    return this.http.post(`${this.base_url}/users`,user)

  }
  //get existing details
  getExistingUser(id:any){
    return this.http.get(`${this.base_url}/users/${id}`)

  }
  

  updateUser(id:any,data:UserSchema){
   return  this.http.put(`${this.base_url}/users/${id}`,data)
  }

  deleteUser(id:any){
    return this.http.delete(`${this.base_url}/users/${id}`)

  }


  // update admin picture
  updateAdmin(admPic:UserSchema){
       return this.http.put(`${this.base_url}/users/1`,admPic)
  }
}