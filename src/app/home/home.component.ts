import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalemployeeInActive:number=0
  totalemployeeActive: number = 0;
  totalEmployeeCount: number = 0;
  adminName: string = '';

  constructor(private api: ApiService, private homerouter:Router ) {}
  ngOnInit(): void {
    if (localStorage.getItem('admin_name')) {
      this.adminName = localStorage.getItem('admin_name') || '';
    }
    this.totalemployee();
    this.ActiveEmployee();
    this.InactiveEmployee()
  }

  UpdateAdminName(event: any) {
    this.adminName = event;
  }
  totalemployee() {
    this.api.getallusers().subscribe((res: any) => {
      this.totalEmployeeCount = res.length;
    });
  }
  ActiveEmployee() {
    this.api.getallusers().subscribe((res: any) => {
      this.totalemployeeActive = res
        .filter((item: any) => item.active == '1')
        .map((act: any) => act.active).length;
    });
  }

  InactiveEmployee(){
     this.api.getallusers().subscribe((res:any)=>{
      this.totalemployeeInActive = res
      .filter((item: any) => item.active == '0')
      .map((act: any) => act.active).length;
     })
  }
  Logout(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem("admin_pswd")
    // redirect to login page
    this.homerouter.navigateByUrl('')
  
  }
}
