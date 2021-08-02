import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from './../../modelo/persona';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: Persona = new Persona();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async guardar() {
    console.log("Entro guardar");
  
    await this.authService.onRegister(this.user.email, this.user.password); // registra al usuario por email y contrasena
    this.router.navigate(["login"]);
  }

  back(){
    this.router.navigate(["login"]);
  }

}
