import { first } from 'rxjs/operators';
import { Product } from './../../modelo/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  producto: Product = new Product();
  productos: any;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,) {
     /* route.queryParams.subscribe(params => {
        console.log(params);
        this.productos.nombre = params.nombre;
        this.productos.precio = params.precio;
        this.productos.image = params.image;
        /*this.producto= new Product();

        if (this.router.getCurrentNavigation().extras.queryParams) {
          this.producto = this.router.getCurrentNavigation().extras.queryParams.producto;
          console.log(this.producto);
      
        }

      })*/
     localStorage.getItem('listaProductos')
     console.log(localStorage.getItem('listaProductos'));
     }

  ngOnInit() {
    //this.productos = this.productService.getProductos();
  }

}
