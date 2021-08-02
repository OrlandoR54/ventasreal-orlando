import { Product } from './../../modelo/product';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  producto: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    route.queryParams.subscribe(params => {
      console.log(params);
      this.producto = new Product();

      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.producto = this.router.getCurrentNavigation().extras.queryParams.producto;
        console.log(this.producto);
      }
    })
   }

  ngOnInit() {
  }
agrega(){
    this.router.navigate(["carrito"]);
  
}

  agregar(producto:any){
    let params: NavigationExtras = { 
      queryParams: {
        producto: producto
      }
    }

    this.router.navigate(["inicio"], params);
    //this.router.navigate(["carrito"]);
  }
}
