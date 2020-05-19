import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  user: User;
  userObject: User;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private data:DataService
    ) {
    this.user=new User();
   }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const id = params['id'];
      console.log(id)
      this.detail(id);
    })
  }

  detail(id){
   /* this.data.getUsersById(id).snapshotChanges().subscribe(
      (u) => {
        console.log("product" + u);
        this.user = u.payload.data();
        this.user['$key'] = id;
        console.log(JSON.stringify(this.user));
      },
      (err) => {
       console.log("======="+err);
      }
    );*/
  }
/*
  upUser(mykey: string, form: NgForm){
    this.data.updateUser(mykey, form.value);
    this.router.navigate(['']);
  }*/

  /*delUser(mykey: string){
    this.data.deleteUser(mykey);

  }*/
}
