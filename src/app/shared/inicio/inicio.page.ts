import { Product } from './../../modelo/product';
import { ProductService } from './../../services/product.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
/*
  
  producto: Product = new Product();
  
  image: any;
  nombre: any;
  precio: any;
  detalle: any;
  */
  productos: any;

  public carritos:Array<any>=[];
 
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private menu: MenuController,
    private productService: ProductService,
    
  ) { 
    /*route.queryParams.subscribe(params => {
      console.log("Parametros: ", params)
      this.nombre = params.nombre;
      this.apellido = params.apellido;
      this.email = params.email;
      this.image =  params.imagen ;
      console.log("IMAGEN: ", this.image);
    });*/
  }

  ngOnInit() {
    /*let producto = [];
    this.productService.getProductos().subscribe(data => {
      producto = data;

      if(producto.length >= 1){
        for (let p = 0; p <= producto.length; p++) {
          this.image = producto[p].image;
          this.nombre = producto[p].nombre;
          this.precio = producto[p].precio;
          
        }
        console.log(" si existe");
        this.image = producto[0].image,
        this.nombre = producto[0].nombre,
        this.precio = producto[0].precio,
        this.detalle = producto[0].detalle
      }
    });*/

    this.productos = this.productService.getProductos();
  }
  
  ir(producto: any){
    let params: NavigationExtras = { 
      queryParams: {
        producto: producto
      }
    }

    this.router.navigate(["detalle"], params);

  } 


  agregar(producto:any){
    
   

    this.carritos.push(producto);
    for (let p = 0; p< this.carritos.length; p++) {
      localStorage.setItem('listaProductos', JSON.stringify(this.carritos))
      
    }
    let params: NavigationExtras = {
      queryParams:{
        productos: this.carritos
      }
    }
    this.router.navigate(["carrito"], params);
    this.router.navigate(["inicio"]);
  }

  navega(){
    this.router.navigate(["carrito"]);
  }

  call(){
    
  }

  onLogout() {
    console.log("logout");
    this.authService.logout();
    this.router.navigate(["iniciar-sesion"]);
    this.menu.close(); // Se cierra el sidemenu

  }

}
