import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  //Activated Route-to get pathparameter from url
  user: UserSchema = {};

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const { id } = res;
      console.log(id);
      this.existingUser(id);
    });
  }

  existingUser(id: any) {
    this.api.getExistingUser(id).subscribe({
      next: (res: UserSchema) => {
        console.log(res);
        this.user = res;
      },
      error: (err: any) => {
        console.log(err);
        alert('cannot perform task now...please try after sometime');
      },
    });
  }


  updateUser() {
    this.api.updateUser(this.user.id, this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('User Details Updated Successfully..');
      },
      error: (err: any) => {
        console.log(err);
        alert('Cannot Perform task right now...Please try after sometime');
      },
    });
  }
  cancelUpdate(userId:any){
    this.existingUser(userId)
    // console.log("cancel clicked");
    
  }

}
