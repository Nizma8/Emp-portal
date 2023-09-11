import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  passWord: string = '';
  constructor(private api: ApiService,private loginRouter:Router) {}
  login() {
    if (this.email && this.passWord) {
      // compare username and password with admin details
      // we should get admin details from http:/localhost:3000/users/1
      //for that we have to make an api call to http:/localhost:3000/users/1
      this.api.adminDetails().subscribe({
        next: (result: any) => {
          console.log(result);
          
          if(this.email=== result.email&& this.passWord===result.password
            ){
              localStorage.setItem("admin_name",result.name)
              localStorage.setItem("admin_pswd",result.password)
              alert("Authorisation successful")
            this.loginRouter.navigateByUrl('home')
            // save the details in local storage
          }
            else{
              alert("Inavalid Credentials")
            }
            //navigate to homepage-use navigateByUrl

        },
        error: (result: any) => {
          alert("cannot fetch data now....please try after sometime!!!")
        },
      });
    } else {
      alert('please fill the form completely');
    }
  }
}
