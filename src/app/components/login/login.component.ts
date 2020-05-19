import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

import Swal from'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User=new User;
  admin: boolean = false;
  
  userList:User[];
  userObject: User;


  constructor(
    private authService: AuthService,
		private data: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }
  getUser(userForm: NgForm){
	const x = this.authService.getUser();
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
		/*const v = userForm.value["email"];
		const w =this.userObject.find(v);*/
		const e =this.userList.find(admin => admin.email === userForm.value["email"]);
		console.log("entro "+e.puesto);
		
		if(e.puesto=="administrador"){
			this.admin=true;
			console.log("es admin? "+this.admin);
		}else{
			this.admin=false
			console.log("es admin? "+this.admin);

		}
      },
      (err) => {
        console.log(err);
      }
   );
  }

  signInWithEmail(userForm: NgForm) {
	  
	this.getUser(userForm);
		this.authService
			.signInRegular(userForm.value["email"], userForm.value["password"])
			.then((res) => {
				
				const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Bienvenido',
					showConfirmButton: false,
					timer: 1000
				  })

				
					this.router.navigate([returnUrl || "listProduct"]);

			})
			.catch((err) => {
				console.log("ERROR : "+err)
			});
	}
    
  
}
