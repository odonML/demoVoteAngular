import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from'sweetalert2';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: Producto=new Producto;
  constructor(
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addProducto(form : NgForm){
    this.data.addProducto(form.value);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['list']);    
  }
}
