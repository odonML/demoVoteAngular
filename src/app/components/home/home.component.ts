import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userList:User[];
  userObject: User;
  constructor(private data:DataService){ }

  ngOnInit() {
     this.getUsers();
  }


  getUsers(){
    /*const x = this.data.getUsers();
    x.snapshotChanges().subscribe(
      (u) => {
        this.userList = [];
        console.log("products" + u);

        u.forEach((element) => {
          this.userObject = element.payload.doc.data();
          this.userObject.$key = element.payload.doc.id;
          console.log("data : " + this.userObject.$key);
          this.userList.push(this.userObject as User);
          console.log(JSON.stringify(this.userList));
        });
      },
      (err) => {
        console.log(err);
      }
   );
  
    this.data.getUsers().subscribe(data =>{
      this.users = data;
      console.log(this.users);
    })*/
  }



  uno(user){
    console.log(user);
  }
  
/*
  doble(){
    console.log("dos click");
    //ejercicio 2
    this.h1style=true;
  }*/
  hover(){
    console.log("hover sobre el boton");
  }
  afuera(){
    console.log("salio del boton");
  }
  rapido(){
    console.log("click rapido");
  }
  suelta(){
    console.log("suelta el boton");
  }

}
