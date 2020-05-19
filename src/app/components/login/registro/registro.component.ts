import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

import Swal from'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  user:User =new User;
  puesto:any[]=[
    {id:"1", description:"cliente"},
    {id:"2", description:"administrador"}
  ];

  constructor(
    private authService: AuthService,
		private data: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  addUser(userForm: NgForm) {
		
      console.log("admin");

		this.authService
			.createUserWithEmailAndPassword(userForm.value["email"], userForm.value["password"])
			.then((res) => {
        this.data.createUser(userForm.value);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cuenta Creada',
          showConfirmButton: false,
          timer: 1500
        })
      })			
	}
}
