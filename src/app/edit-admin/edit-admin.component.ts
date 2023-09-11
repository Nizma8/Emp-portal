import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserSchema } from '../Module/users/users.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {
  url="./assets/images/img1.png"
  editAdminStatus:boolean = false
  admin:UserSchema={}

 @Output() OnUpdate = new EventEmitter()

constructor(private api:ApiService){
  this.api.adminDetails().subscribe({
    next:(res:UserSchema)=>{
        console.log(res);
        this.admin=res
        if(res.picture){
          this.url=res.picture
        }
        
        
    }
  })
}

editAdminBtnClick(){
  this.editAdminStatus=true
 
}

getFile(event:any){
    console.log(event.target.files[0]);
    let files= event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(files)
    fr.onload=(event:any)=>{
    this.url=event.target.result
    this.admin.picture= this.url
    }
    
}

Update(){
  this.api.updateAdmin(this.admin).subscribe({
    next:(res:any)=>{
      console.log(res);
      localStorage.setItem("admin_name",res.name)
      localStorage.setItem("admin_pswd",res.password)
      console.log(alert("Admin Details Update Successfully"));

      this.editAdminStatus=false
      this.OnUpdate.emit(res.name)
      
    },
    error:(err:any)=>{
      console.log(err);
      alert("updation failed server currently unavailable")
      
    }

  })
}


cancel(){
  this.editAdminStatus=false

}


}
