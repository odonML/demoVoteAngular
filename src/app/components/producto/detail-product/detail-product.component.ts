import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  
  product: Producto;
  productObject: Producto;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private data:DataService
    ) {
    this.product=new Producto();
   }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const id = params['id'];
      console.log(id)
      this.detail(id);
    })
  }

  detail(id){
    this.data.getProductoById(id).snapshotChanges().subscribe(
      (u) => {
        console.log("product" + u);
        this.product = u.payload.data();
        this.product['$key'] = id;
        console.log(JSON.stringify(this.product));
      },
      (err) => {
       console.log("======="+err);
      }
    );
  }

 upProduct(mykey: string, form: NgForm){
    this.data.updateProduct(mykey, form.value);
    Swal.fire({
      position: 'top-end',
      width: '300px',
      icon: 'success',
      title: 'Producto editado',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['listProduct']);
  }

  delProduct(mykey: string){   
    this.data.deleteProduct(mykey);
    Swal.fire({
      position: 'top-end',
      width: '300px',
      icon: 'error',
      title: 'Producto eliminado',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['listProduct']);
  }

}
