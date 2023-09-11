import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
   page:number=1;
   count:number=0;
   tablesize:number=5;


  allUsers: UserSchema[] = [];
  searchKey:string=""
  

  constructor(private api: ApiService,private homeRouter:Router) {}

  //when UsersListComponent page is open call getUserList
  ngOnInit(): void {
    this.getUserList();
    
  }

  getUserList() {
    //
    this.api.getallusers().subscribe({
      next: (result: any) => {
        console.log(result);
        this.allUsers = result;
        this.count=this.allUsers.length

      },
      error: (result: any) => {
        console.log(result);
        alert('error while fetching the data..... Please try after some time');
      },
    });
  }


  deleteUsers(id:any){
    this.api.deleteUser(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("dekete successfully")
        
      },
      error:(err:any)=>{
        console.log(err);
        alert("cannot perform data...please try after aftersometime")
        
      }
    })
  }
 sortById(){
  this.allUsers.sort((a:any,b:any)=>a.id-b.id)
 }
 sortByName(){
  this.allUsers.sort((a:any,b:any)=> a["name"].localeCompare(b["name"]))
 }
 
 pageChanged(event:any){
  this.page=event
  }
  generatePdf(){
    let pdf =new jsPDF()
    let head=[['user Id,Username','Email','status']]
    let body:any=[]
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(20)
    pdf.text("All EMployee List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save("allUsers.pdf")
  }

  Logout(){
  localStorage.removeItem("admin_name")
  localStorage.removeItem("admin_pswd")
  // redirect to login page
  this.homeRouter.navigateByUrl('')

}
}
